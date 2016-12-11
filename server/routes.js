const authController = require('./controllers/auth')
const ideasController = require('./controllers/ideas')
const commentsController = require('./controllers/comments')
const { isAuthenticated, isNotAuthenticated } = require('./config/passport')

module.exports = (app) => {
  // Auth Routes
  app.get('/login', isNotAuthenticated, authController.getLogin)
  app.post('/login', isNotAuthenticated, authController.postLogin)
  app.get('/register', isNotAuthenticated, authController.getRegister)
  app.post('/register', isNotAuthenticated, authController.postRegister)
  app.post('/logout', isAuthenticated, authController.logout)

  // Idea API routes
  app.get('/api/ideas', isAuthenticated, ideasController.getAll)
  app.post('/api/ideas', isAuthenticated, ideasController.create)
  app.post('/api/ideas/:id/vote', isAuthenticated, ideasController.upVote)
  app.patch('/api/ideas/:id', isAuthenticated, ideasController.update)
  app.delete('/api/ideas/:id', isAuthenticated, ideasController.delete)

  // Comment API routes
  app.get('/api/ideas/:ideaId/comments', isAuthenticated, commentsController.getAll)
  app.post('/api/ideas/:ideaId/comments', isAuthenticated, commentsController.create)
  app.delete('/api/ideas/:ideaId/:commentId', isAuthenticated, commentsController.delete)

  app.get('/', isAuthenticated, (req, res, next) => next())
}
