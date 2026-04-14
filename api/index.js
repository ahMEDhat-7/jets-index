const { createNestEdgeHandler } = require('@vercel/nest');

const { AppModule } = require('./dist/app.module');

module.exports = createNestEdgeHandler(AppModule, {
  origin: '*',
});
