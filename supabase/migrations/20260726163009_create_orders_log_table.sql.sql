/*
# Create orders log table (single-tenant, no auth)

1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `shopify_draft_order_id` (text, the Shopify draft order id)
  - `order_number` (text, human-readable Shopify order number)
  - `invoice_url` (text, Shopify invoice URL for the draft order)
  - `customer_name` (text)
  - `customer_phone` (text)
  - `customer_city` (text)
  - `customer_address` (text)
  - `total_price` (text, Shopify-formatted price string)
  - `currency` (text)
  - `line_items_count` (integer)
  - `created_at` (timestamptz, defaults to now)
2. Security
- Enable RLS on `orders`.
- This is a single-tenant storefront with no sign-in screen. The edge function
  inserts rows using the service role key (server-side only). Public/anon
  clients do NOT need read access to this audit table, so we only allow
  the service role (which bypasses RLS) to write. We add an anon INSERT
  policy as a safety net for any future server-side anon writes, but no
  SELECT policy is granted to anon/authenticated — the table is write-only
  from the client perspective.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_draft_order_id text,
  order_number text,
  invoice_url text,
  customer_name text,
  customer_phone text,
  customer_city text,
  customer_address text,
  total_price text,
  currency text,
  line_items_count integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- No SELECT policy for anon/authenticated: audit table is not client-readable.
-- Allow anon INSERT so the edge function (or any server client) can log orders.
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);
