// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Passe den Pfad an, wenn nötig
    createProxyMiddleware({
      target: 'http://localhost:8081', // Backend-Server-URL
      changeOrigin: true,
    })
  );
};
