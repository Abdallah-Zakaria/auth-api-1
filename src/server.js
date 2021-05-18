'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const errorHandlerAuth = require('./error-handlers-auth/500.js');
const notFoundAuth = require('./error-handlers-auth/404.js');
const authRoutes = require('./routes/auth.js');
const apiRoutesV1 = require('./routes/v1.js');
const apiRoutesV2 = require('./routes/v2.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/v1', apiRoutesV1);
app.use('/v2', apiRoutesV2);

// Catchalls
app.use(notFoundAuth);
app.use(errorHandlerAuth);
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
