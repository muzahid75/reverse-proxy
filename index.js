const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy to your insecure HTTP API
app.use('/api', createProxyMiddleware({
  target: 'http://35.177.100.215:8002',
  changeOrigin: true,
//   pathRewrite: { '^/api': '' }, // optional: remove /api prefix
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`HTTP reverse proxy running at http://localhost:${PORT}`);
});

module.exports = app;