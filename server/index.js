require('newrelic');
const express = require('express');
// const morgan = require('morgan');
// const compression = require('compression');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const router = require('./routes');

// const app = express();
// module.exports.app = app;

// const PORT = 8080;
// app.set('port', PORT);

// // app.use(compression());
// // app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/', router);

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  module.exports.app = app;

  const PORT = 8080;
  app.set('port', PORT);

  // app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', router);

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
