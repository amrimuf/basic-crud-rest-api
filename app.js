/* 
  contains all the application level config, 
  middlewares, and supporting libraries
*/

const express = require('express') // import express
const app = express() // initialize app with express
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// logger
app.use(logger('dev'))

// body parsers
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// import the routes
const routes = require('./app/routes/PostsRoutes')

// middleware to use the routes
app.use('/api', routes)

// export the app
module.exports = app
