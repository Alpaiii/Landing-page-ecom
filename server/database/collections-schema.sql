-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  image VARCHAR(500),
  image_hover VARCHAR(500),
  season VARCHAR(50),
  year INTEGER,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_collections junction table (many-to-many)
CREATE TABLE IF NOT EXISTS product_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, collection_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_collections_slug ON collections(slug);
CREATE INDEX IF NOT EXISTS idx_collections_featured ON collections(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_collections_product ON product_collections(product_id);
CREATE INDEX IF NOT EXISTS idx_product_collections_collection ON product_collections(collection_id);

-- Create trigger for collections
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
