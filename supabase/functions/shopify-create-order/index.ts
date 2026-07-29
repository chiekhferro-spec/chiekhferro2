// supabase/functions/shopify-create-order/index.ts
// CHIEKH FERRO — Creates a Shopify Draft Order via the Admin REST API.
// Receives customer details + cart line items from the storefront,
// creates a draft order, and returns the order reference + invoice URL.
//
// Required secrets (configure in Supabase Edge Function secrets):
//   SHOPIFY_STORE_DOMAIN   e.g. "chiekh-ferro.myshopify.com"
//   SHOPIFY_ADMIN_TOKEN    Admin API access token (shpat_...)
//   SHOPIFY_API_VERSION    e.g. "2024-10"

import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LineItemInput {
  variant_id?: string;
  title: string;
  quantity: number;
  price?: string;
  sku?: string;
}

interface CheckoutPayload {
  customer: {
    full_name: string;
    phone: string;
    address: string;
    city: string;
  };
  items: LineItemInput[];
  note?: string;
}

function env(key: string): string {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing secret: ${key}`);
  return v;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json() as CheckoutPayload;

    // --- Validate input ---
    const { customer, items, note } = body;
    if (!customer || !items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "بيانات الطلب غير مكتملة" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const required: Array<[string, string]> = [
      ["الاسم الكامل", customer.full_name],
      ["رقم الهاتف", customer.phone],
      ["العنوان الكامل", customer.address],
      ["المدينة", customer.city],
    ];
    for (const [label, val] of required) {
      if (!val || !val.trim()) {
        return new Response(
          JSON.stringify({ error: `الحقل مطلوب: ${label}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    const domain = env("SHOPIFY_STORE_DOMAIN");
    const token = env("SHOPIFY_ADMIN_TOKEN");
    const apiVersion = env("SHOPIFY_API_VERSION");
    const adminUrl = `https://${domain}/admin/api/${apiVersion}`;

    // --- Build Shopify line items ---
    const lineItems = items.map((item) => ({
      title: item.title,
      quantity: Math.max(1, Math.floor(item.quantity)),
      variant_id: item.variant_id ? Number(item.variant_id) : undefined,
      price: item.price,
      sku: item.sku,
      requires_shipping: true,
    }));

    // --- Build the draft order payload ---
    const draftOrder = {
      draft_order: {
        line_items: lineItems,
        customer: {
          first_name: customer.full_name,
          phone: customer.phone,
        },
        shipping_address: {
          first_name: customer.full_name,
          phone: customer.phone,
          address1: customer.address,
          city: customer.city,
          country: "DZ",
        },
        billing_address: {
          first_name: customer.full_name,
          phone: customer.phone,
          address1: customer.address,
          city: customer.city,
          country: "DZ",
        },
        note: note || `طلب من متجر CHIEKH FERRO — الدفع عند الاستلام`,
        tags: "web-storefront, cash-on-delivery",
        inventory_behaviour: "decrement_ignoring_policy",
        use_customer_default_address: false,
      },
    };

    // --- Call Shopify Admin API ---
    const shopifyRes = await fetch(`${adminUrl}/draft_orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify(draftOrder),
    });

    const raw = await shopifyRes.text();
    if (!shopifyRes.ok) {
      console.error("Shopify error:", shopifyRes.status, raw);
      let msg = "فشل إنشاء الطلب في Shopify";
      try {
        const j = JSON.parse(raw);
        if (j.errors) msg = typeof j.errors === "string" ? j.errors : JSON.stringify(j.errors);
      } catch { /* non-JSON error body */ }
      return new Response(
        JSON.stringify({ error: msg, shopify_status: shopifyRes.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const json = JSON.parse(raw);
    const order = json.draft_order;
    if (!order || !order.id) {
      return new Response(
        JSON.stringify({ error: "استجابة غير متوقعة من Shopify" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // --- Optionally persist a local record for analytics/audit ---
    // Best-effort: do not fail the response if this errors.
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      await supabase.from("orders").insert({
        shopify_draft_order_id: String(order.id),
        order_number: order.order_number ?? null,
        invoice_url: order.invoice_url ?? null,
        customer_name: customer.full_name,
        customer_phone: customer.phone,
        customer_city: customer.city,
        customer_address: customer.address,
        total_price: order.total_price ?? null,
        currency: order.currency ?? null,
        line_items_count: items.length,
      });
    } catch (e) {
      console.error("Supabase log insert failed:", (e as Error).message);
    }

    // --- Success response ---
    return new Response(
      JSON.stringify({
        success: true,
        order_id: String(order.id),
        order_number: order.order_number ?? null,
        invoice_url: order.invoice_url ?? null,
        total_price: order.total_price ?? null,
        currency: order.currency ?? "DZD",
        status: order.status ?? "open",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "خطأ داخلي في الخادم" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
