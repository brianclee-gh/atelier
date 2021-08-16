CREATE TABLE features (
    id integer NOT NULL,
    product_id integer,
    feature character varying(50),
    value character varying(50)
);


ALTER TABLE features OWNER TO brian;


CREATE TABLE photos (
    id integer NOT NULL,
    style_id integer,
    url character varying(1000),
    thumbnail_url character varying
);


ALTER TABLE photos OWNER TO brian;


CREATE TABLE products (
    id integer NOT NULL,
    name character varying(50),
    slogan character varying(255),
    description text,
    category character varying(50),
    default_price character varying(10)
);


ALTER TABLE products OWNER TO brian;

CREATE TABLE related (
    id integer NOT NULL,
    current_product_id integer,
    related_product_id integer
);


ALTER TABLE related OWNER TO brian;


CREATE TABLE skus (
    id integer NOT NULL,
    style_id integer,
    size character varying(10),
    quantity integer
);


ALTER TABLE skus OWNER TO brian;


CREATE TABLE styles (
    style_id integer NOT NULL,
    product_id integer,
    name character varying(50),
    sale_price character varying,
    original_price character varying,
    default_style character varying
);


ALTER TABLE styles OWNER TO brian;

CREATE INDEX features_product_id_idx ON features USING btree (product_id);
CREATE INDEX photos_style_id_idx ON photos USING btree (style_id);
CREATE INDEX products_id_idx ON products USING btree (id);
CREATE INDEX related_current_product_id_idx ON related USING btree (current_product_id);
CREATE INDEX skus_style_id_idx ON skus USING btree (style_id);
CREATE INDEX styles_product_id_idx ON styles USING btree (product_id);
