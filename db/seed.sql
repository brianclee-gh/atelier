DROP DATABASE sdcproducts;
CREATE DATABASE sdcproducts;

\c sdcproducts;

CREATE TABLE products (
    id integer NOT NULL,
    name character varying(50),
    slogan character varying(255),
    description text,
    category character varying(50),
    default_price character varying(10)
);
COPY products (id, name, slogan, description, category, default_price)
FROM ''
delimiter ','
csv header;


CREATE TABLE features (
  id integer NOT NULL,
  product_id integer,
  feature character varying(50),
  value character varying(50)
);
COPY features
FROM ''
delimiter ','
csv header;


CREATE TABLE styles (
  style_id integer NOT NULL,
  product_id integer,
  name character varying(50),
  sale_price character varying,
  original_price character varying,
  default_style character varying
);
COPY styles
FROM ''
delimiter ','
csv header;


CREATE TABLE photos (
  id integer NOT NULL,
  style_id integer,
  url character varying(1000),
  thumbnail_url character varying
);
COPY photos
FROM ''
delimiter ','
csv header;


CREATE TABLE skus (
  id integer NOT NULL,
  style_id integer
  size character varying(10),
  quantity integer,
);
COPY skus
FROM ''
delimiter ','
csv header;


CREATE TABLE related (
  id integer NOT NULL,
  current_product_id integer,
  related_product_id integer
);
COPY related
FROM ''
delimiter ','
csv header;


CREATE INDEX ON products (id);
CREATE INDEX ON features (product_id);
CREATE INDEX ON styles (product_id);
CREATE INDEX ON photos (style_id);
CREATE INDEX ON skus (style_id);
CREATE INDEX ON related (current_product_id);