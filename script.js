import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '15s',
};

export default function () {
  // http.get('http://test.k6.io');
  http.get('http://localhost:8080/products/1/');
  sleep(1);
}

// the way you open db connection
// pooling
