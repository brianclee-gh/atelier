#  Atelier

A RESTful API built to serve product data for an e-commerce shopping site.

## Description

Atelier is able to serve 10,000 clients over 1 min for a high traffic e-commerce website once deployed. Atelier has been deployed with an NGINX load balancer with caching and 4 separate EC2 instances running an Express server. Each instance is able to fetch from its respective PostgreSQL database. The database has been indexed via btree for reduced latency (lowered from 200ms to 4ms).

## Getting Started

### Tech Used

<b>Back End</b>: PostgreSQL with pgPromise, Express.js

<b>Stress testing</b>: New Relic, K6, Loader.io

<b>Deployment</b>: AWS (EC2 instances), NGINX with caching

### Installing

```
npm install
```

### Executing program

```
npm start
```

### Results
![Alt text](/screenshots/loaderio.png?raw=true "loader.io results")
LoaderIO at 10,000 clients over 1 min

## Routes
- GET /products (query parameters: page, count)
> Get a list of products. Default page is 1 and default count is 5.
- GET /products/:product_id
> Get a specific product's data via its product_id
- GET /products/:product_id/styles
> Get a specific product's style data, including stocked quantity and colors via its product_id
- GET /products/:product_id/related
> Get a list of product_ids of products that are similar or related to the requested product

## Authors

Contributors names and contact info

Brian Lee
[@brianclee-gh](https://github.com/brianclee-gh)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the [TBD] License - see the LICENSE.md file for details

## Acknowledgments

Isaiah Love

Sophie Partovi