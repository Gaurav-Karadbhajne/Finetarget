// src/cluster.js
const cluster = require('cluster');
const http = require('http');
const os = require('os');
const app = require('./app');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  http.createServer(app).listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
