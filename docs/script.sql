-- Database Schema for jets-index
-- Updated to support bilingual (en/ar) content via translation tables

-- Users table
CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table (base only — no translatable fields)
CREATE TABLE categories (
    category_id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Category translations
CREATE TABLE category_translations (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL,
    name VARCHAR(50) NOT NULL,
    domain VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category_id, locale)
);

-- Countries table (base only — no translatable fields)
CREATE TABLE countries (
    country_id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Country translations
CREATE TABLE country_translations (
    id UUID PRIMARY KEY,
    country_id UUID NOT NULL REFERENCES countries(country_id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(country_id, locale)
);

-- Manufacturers table (base only — no translatable fields)
CREATE TABLE manufacturers (
    manu_id UUID PRIMARY KEY,
    country_id UUID NOT NULL REFERENCES countries(country_id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Manufacturer translations
CREATE TABLE manufacturer_translations (
    id UUID PRIMARY KEY,
    manufacturer_id UUID NOT NULL REFERENCES manufacturers(manu_id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL,
    name VARCHAR(150) NOT NULL,
    specialization VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(manufacturer_id, locale)
);

-- Platforms table (base only — no translatable fields)
CREATE TABLE platforms (
    platform_id UUID PRIMARY KEY,
    unit_cost_usd DECIMAL(15, 2),
    operational_status VARCHAR(50),
    technical_specs JSONB,
    image_url VARCHAR(512),
    category_id UUID NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
    manu_id UUID NOT NULL REFERENCES manufacturers(manu_id) ON DELETE RESTRICT,
    country_id UUID NOT NULL REFERENCES countries(country_id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform translations
CREATE TABLE platform_translations (
    id UUID PRIMARY KEY,
    platform_id UUID NOT NULL REFERENCES platforms(platform_id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(platform_id, locale)
);

-- Platform images
CREATE TABLE platform_images (
    id UUID PRIMARY KEY,
    platform_id UUID NOT NULL REFERENCES platforms(platform_id) ON DELETE CASCADE,
    url VARCHAR(512) NOT NULL,
    alt VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blogs table (base only — no translatable fields)
CREATE TABLE blogs (
    blog_id UUID PRIMARY KEY,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog translations
CREATE TABLE blog_translations (
    id UUID PRIMARY KEY,
    blog_id UUID NOT NULL REFERENCES blogs(blog_id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(blog_id, locale)
);

-- Indexes
CREATE INDEX idx_category_translations_category ON category_translations(category_id);
CREATE INDEX idx_country_translations_country ON country_translations(country_id);
CREATE INDEX idx_manufacturers_country ON manufacturers(country_id);
CREATE INDEX idx_manufacturer_translations_manufacturer ON manufacturer_translations(manufacturer_id);
CREATE INDEX idx_platforms_category ON platforms(category_id);
CREATE INDEX idx_platforms_manufacturer ON platforms(manu_id);
CREATE INDEX idx_platforms_country ON platforms(country_id);
CREATE INDEX idx_platform_translations_platform ON platform_translations(platform_id);
CREATE INDEX idx_platform_images_platform ON platform_images(platform_id);
CREATE INDEX idx_blog_translations_blog ON blog_translations(blog_id);
