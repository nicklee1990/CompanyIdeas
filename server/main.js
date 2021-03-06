const path = require('path')
const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const User = require('./models/User').model
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const dotenv = require('dotenv')
const MongoStore = require('connect-mongo')(session)

const app = express()
const paths = config.utils_paths
dotenv.load({ path: '.env' })

// Set up the view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(flash())

// Set up the API validator and parser
app.use(bodyParser.json())
app.use(expressValidator())

// Set up the session for auth management via passport
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGO_HOST,
    autoReconnect: true
  })
}))
app.use(passport.initialize())
app.use(passport.session())

// Load routes before setting the fallback for the frontend app
const router = require('./routes')
router(app)

// Apply middleware for users
// passport config
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))
  // Serve server side assets
  app.use(express.static(paths.server('static')))
  app.use(express.static(paths.server('styles')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
const history = require('connect-history-api-fallback')({
  disableDotRule: false
})

app.use(history)

module.exports = app
