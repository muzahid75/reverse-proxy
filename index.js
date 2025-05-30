const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors');

const app = express();

app.use(cors())

// Proxy to your insecure HTTP API
app.use('/api', createProxyMiddleware({
  target: 'http://35.177.100.215:8002',
  changeOrigin: true,
//   pathRewrite: { '^/api': '' }, // optional: remove /api prefix
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.removeHeader('origin'); // Remove Origin header
    proxyReq.removeHeader('referer');
    proxyReq.removeHeader('user-agent');
  }
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`HTTP reverse proxy running at http://localhost:${PORT}`);
});

module.exports = app;