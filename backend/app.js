const express = require('express');
const APP = express();
require('dotenv').config();
var createError = require('http-errors')
const CORS = require('cors');
const logger = require('morgan');
const PORT = process.env.PORT || 5000;
const Mongoose = require('mongoose')
const auth = require('./middleware/auth').verifyToken


//=== require routes
const newsRoute = require('./routes/news')
const usersRoute = require('./routes/user')
const adsRoute = require('./routes/ads')
const uploadRoute = require('./routes/upload')
const categoriesRoute = require('./routes/categories')
//===============================================end imports.

APP.use(express.static('public'));

//=== connect to the database using mongoose
Mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('successfully connected to the database.'))
    .catch(err => console.error(err))


//=== using modules middleware
APP.use(logger('dev'));
APP.use(CORS())
APP.use(express.json())
APP.use(express.urlencoded({ extended: false }));
APP.use('/public/uploads', express.static('public/uploads'))


//=== middleware to serve files from 'public/upload'
APP.use(express.static('public'));
//=== use routes
APP.use('/api/v1/news', newsRoute)
APP.use('/api/v1/user', usersRoute)
APP.use('/api/v1/ads', adsRoute)
APP.use('/api/v1/upload', uploadRoute)
APP.use('/api/v1/categories', categoriesRoute)

// create and error object,catch 404 and forward to error handler
APP.get('*', (req, res, next) => {
    return next(createError(404, 'the selected route does not exist'))
})


//=======error handler
APP.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        error: true,
        message: err.message
    })
})

APP.listen(PORT, () => console.log('listening on port: ' + PORT));
