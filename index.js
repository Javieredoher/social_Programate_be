const express = require('express');
const app = express();
const { config } = require('./config/index');

const moviesApi = require('./routes/movies');
const { logError, errorHandler, wrapError } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//Middleware
//body parser
app.use(express.json());//interpeter json format

//Always the error middleware go to to end of the middleware
app.use(logError)
app.use(wrapError)
app.use(errorHandler)


moviesApi(app);
//catch 404
app.use(notFoundHandler);
app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`)
});