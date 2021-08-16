CREATE SCHEMA public;

ALTER SCHEMA public OWNER TO postgres;

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.features (
    id integer NOT NULL,
    product_id integer,
    feature character varying(50),
    value character varying(50)
);


ALTER TABLE public.features OWNER TO postgres;


CREATE TABLE public.photos (
    id integer NOT NULL,
    style_id integer,
    url character varying(1000),
    thumbnail_url character varying
);


ALTER TABLE public.photos OWNER TO postgres;


CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(50),
    slogan character varying(255),
    description text,
    category character varying(50),
    default_price character varying(10)
);


ALTER TABLE public.products OWNER TO postgres;

CREATE TABLE public.related (
    id integer NOT NULL,
    current_product_id integer,
    related_product_id integer
);


ALTER TABLE public.related OWNER TO postgres;


CREATE TABLE public.skus (
    id integer NOT NULL,
    style_id integer,
    size character varying(10),
    quantity integer
);


ALTER TABLE public.skus OWNER TO postgres;


CREATE TABLE public.styles (
    style_id integer NOT NULL,
    product_id integer,
    name character varying(50),
    sale_price character varying,
    original_price character varying,
    default_style character varying
);


ALTER TABLE public.styles OWNER TO postgres;

CREATE INDEX features_product_id_idx ON public.features USING btree (product_id);
CREATE INDEX photos_style_id_idx ON public.photos USING btree (style_id);
CREATE INDEX products_id_idx ON public.products USING btree (id);
CREATE INDEX related_current_product_id_idx ON public.related USING btree (current_product_id);
CREATE INDEX skus_style_id_idx ON public.skus USING btree (style_id);
CREATE INDEX styles_product_id_idx ON public.styles USING btree (product_id);

-- target-db=> \copy source-table from 'source-table.csv' with DELIMITER ',';