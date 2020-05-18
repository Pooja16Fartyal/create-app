'use strict';

const Handlers = require('./hello-world-handlers.js');
const routes = [];

routes.push({
  method: 'GET',
  path: '/hello-world',
  config: {
    description: 'Hello World endpoint',
    notes: 'Can be used to monitor health check of application, e.g. with Sitescope',
    security: {
      xframe: 'sameorigin',
    },
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
  },
  handler: Handlers.helloWorld,
});

module.exports.routes = routes;