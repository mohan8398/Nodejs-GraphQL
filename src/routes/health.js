"use strict";
function registerHealthRoutes(app) {
  app.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.get('/readyz', (_req, res) => {
    // Place readiness checks here (e.g., DB connectivity)
    res.status(200).json({ ready: true });
  });
}

module.exports = { registerHealthRoutes };


