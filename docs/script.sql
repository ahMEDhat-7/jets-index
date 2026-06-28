-- Database Schema for jets-index

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

-- Categories table
CREATE TABLE categories (
    category_id UUID PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_domain VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Countries table
CREATE TABLE countries (
    country_id UUID PRIMARY KEY,
    country_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Manufacturers table
CREATE TABLE manufacturers (
    manu_id UUID PRIMARY KEY,
    manu_name VARCHAR(150) NOT NULL,
    specialization VARCHAR(100),
    country_id UUID REFERENCES countries(country_id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platforms table
CREATE TABLE platforms (
    platform_id UUID PRIMARY KEY,
    platform_name VARCHAR(255) NOT NULL,
    platform_description TEXT,
    unit_cost_usd DECIMAL(15, 2),
    operational_status VARCHAR(50),
    technical_specs JSONB,
    image_url VARCHAR(512),
    category_id UUID REFERENCES categories(category_id) ON DELETE RESTRICT,
    manu_id UUID REFERENCES manufacturers(manu_id) ON DELETE RESTRICT,
    country_id UUID REFERENCES countries(country_id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blogs table
CREATE TABLE blogs (
    blog_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_manufacturers_country ON manufacturers(country_id);
CREATE INDEX idx_platforms_category ON platforms(category_id);
CREATE INDEX idx_platforms_manufacturer ON platforms(manu_id);
CREATE INDEX idx_platforms_country ON platforms(country_id);