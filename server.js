/**
 * Node.js HTTP Server with Static Routing, Custom 404 Handling & Request Logging Middleware
 *
 * Algorithm Implementation:
 * 1. Import necessary modules: http, fs, path
 * 2. Construct file path based on request URL
 * 3. Route root / or /index.html to public/index.html
 * 4. Route /about.html or /about to public/about.html
 * 5. Read file asynchronously
 * 6. Return 404 on file not found
 * 7. Determine content type based on file extension
 * 8. Write 200 OK header with content type
 * 9. Send file content
 * 10-13. http.createServer(), request logger middleware, handleRequest()
 */

// Step 1: Import necessary modules
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME Types dictionary (Step 7 & 15)
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * Middleware: Log incoming requests to the console
 */
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const { method, url } = req;
  
  // Log request start
  console.log(`[${timestamp}] [REQUEST] ${method} ${url}`);

  // Hook into response finish event to log final status code
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] [RESPONSE] ${method} ${url} -> Status: ${res.statusCode}`);
  });

  // Proceed to request handler
  next();
}

/**
 * Serves the custom 404 Not Found page
 */
function serve404(res) {
  const notFoundPath = path.join(__dirname, 'public', '404.html');

  fs.readFile(notFoundPath, (err, content) => {
    if (err) {
      // Fallback if 404.html is missing
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: The requested resource does not exist.');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    }
  });
}

/**
 * Request Handler (Step 13)
 */
function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // Step 2, 3, 4 & 16: Construct file path based on request URL
  let filePath;
  if (pathname === '/' || pathname === '/index.html') {
    filePath = path.join(__dirname, 'public', 'index.html');
  } else if (pathname === '/about' || pathname === '/about.html') {
    filePath = path.join(__dirname, 'public', 'about.html');
  } else {
    // Other assets (e.g., /style.css or other files in public directory)
    filePath = path.join(__dirname, 'public', pathname);
  }

  // Determine file extension and MIME type (Step 7 & 15)
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Step 5: Read file asynchronously
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Step 6 & 14: If file not found (ENOENT), return 404 response
      if (err.code === 'ENOENT') {
        serve404(res);
      } else {
        // Step 11: Handle general server/filesystem errors
        console.error(`[ERROR] Server error reading file ${filePath}:`, err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      }
    } else {
      // Step 8 & 9: Write 200 OK header with content type and send binary content
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

// Step 10: Create HTTP server instance
const server = http.createServer((req, res) => {
  // Execute request logger middleware, then pass to handleRequest
  requestLogger(req, res, () => {
    handleRequest(req, res);
  });
});

// Step 11: Server error handling
server.on('error', (err) => {
  console.error('[SERVER ERROR]', err.message);
});

// Step 12: Server listens on port 3000
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Server is running and listening on port ${PORT}`);
  console.log(` - Homepage:   http://localhost:${PORT}/`);
  console.log(` - About Page: http://localhost:${PORT}/about.html`);
  console.log(` - Test 404:   http://localhost:${PORT}/invalid-route`);
  console.log(`====================================================`);
});
