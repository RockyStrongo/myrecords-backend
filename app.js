require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const router = require('./api/router');
// const { notFound, errorResponse } = require('./handlers/errorHandlers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb', extended: false }));

// Toutes les routes sont préfixées avec /api
app.use('/api', router);
// app.use(notFound);
// app.use(errorResponse);

app.set('url', process.env.URL);
app.set('port', process.env.PORT);

module.exports = app;