require('dotenv').config();
require('./database/mongo')

const express = require('express');
const app = express();
const path = require('path')
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");


// ------------------------------------ Sentry Config Start ------------------------------------ //
Sentry.init({
  dsn: "https://022a015319d2432ab939d726e3bdb409@o1413718.ingest.sentry.io/6753551",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
// ------------------------------------ Sentry Config End ------------------------------------ //



// Global Middlewares Require & Setting
const cors = require('cors')

app.use(express.json())
app.use(cors(''))

const frontend = path.join(__dirname,'../../app/build')
// Map the requests to the static React build directory
app.use(express.static(frontend));

/* // All the unknown requests are redirected to the React SPA
app.use(function (req, res, next) {
    res.sendFile(path.join(frontend, 'index.html'));
});
 */

// Routes Require & Setting
const notesRoutes = require('./routes/notesRoutes')
const usersRoutes = require('./routes/usersRoutes')
const loginRoutes = require('./routes/loginRoutes')
app.use('/api/notes', notesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/login', loginRoutes)


// Error Handling
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors)
app.use(notFound)


// App Listen
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }