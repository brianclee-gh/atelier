CREATE SCHEMA products;

CREATE TABLE products.products (
    id integer NOT NULL,
    name character varying(50),
    slogan character varying(255),
    description text,
    category character varying(50),
    default_price character varying(10)
);

CREATE TABLE products.features (
    id integer NOT NULL,
    product_id integer,
    feature character varying(50),
    value character varying(50)
);

CREATE TABLE products.photos (
    id integer NOT NULL,
    style_id integer,
    url character varying(1000),
    thumbnail_url character varying
);




CREATE TABLE products.related (
    id integer NOT NULL,
    current_product_id integer,
    related_product_id integer
);


CREATE TABLE products.skus (
    id integer NOT NULL,
    quantity integer,
    size character varying(10),
    style_id integer
);

CREATE TABLE products.styles (
    style_id integer NOT NULL,
    product_id integer,
    name character varying(50),
    original_price character varying,
    sale_price character varying,
    default_style character varying
);


ALTER TABLE ONLY products.features
    ADD CONSTRAINT feature_pkey PRIMARY KEY (id);

ALTER TABLE ONLY products.photos
    ADD CONSTRAINT photo_fix_pkey PRIMARY KEY (id);

ALTER TABLE ONLY products.products
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);

ALTER TABLE ONLY products.related
    ADD CONSTRAINT related_pkey PRIMARY KEY (id);

ALTER TABLE ONLY products.skus
    ADD CONSTRAINT sku_pkey PRIMARY KEY (id);

ALTER TABLE ONLY products.styles
    ADD CONSTRAINT style_pkey PRIMARY KEY (style_id);

ALTER TABLE ONLY products.features
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products.products(id);

ALTER TABLE ONLY products.styles
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products.products(id);

ALTER TABLE ONLY products.related
    ADD CONSTRAINT fk_product FOREIGN KEY (current_product_id) REFERENCES products.products(id);

ALTER TABLE ONLY products.photos
    ADD CONSTRAINT fk_style FOREIGN KEY (style_id) REFERENCES products.styles(style_id);

ALTER TABLE ONLY products.skus
    ADD CONSTRAINT fk_style FOREIGN KEY (style_id) REFRENCES products.style(style_id);