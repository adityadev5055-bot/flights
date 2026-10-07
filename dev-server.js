'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT) || 5500;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end('Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad Request');
    return;
  }
  if (pathname === '/') pathname = '/index.html';

  const file = path.resolve(root, `.${pathname}`);
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(file, (statError, stat) => {
    if (statError || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && !process.env.PORT && port === 5500) {
    console.log('Port 5500 is already in use; trying port 8080.');
    port = 8080;
    server.listen(port, '127.0.0.1');
    return;
  }
  console.error(`Could not start the development server: ${error.message}`);
  process.exitCode = 1;
});

server.on('listening', () => {
  console.log(`Root site ready at http://localhost:${port}/`);
  console.log(`Watch experience: http://localhost:${port}/watch.html`);
});

server.listen(port, '127.0.0.1');
