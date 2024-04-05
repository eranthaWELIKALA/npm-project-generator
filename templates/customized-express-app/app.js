const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./app/utils/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/config');
const { connectToDatabase } = require('./config/mongoose/config');

const testRouter = require('./app/routes/test');

connectToDatabase();
const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use Helmet middleware
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up logging middleware
if (process.env.NODE_ENV === 'production') {
    const logDirectory = path.join(__dirname, 'logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory,
    });

    app.use(logger('combined', { stream: accessLogStream }));
} else {
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Register the error handling middleware
app.use(errorHandler);

module.exports = app;
