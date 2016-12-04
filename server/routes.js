const ideasController = require('./controllers/ideas')
const commentsController = require('./controllers/comments')

module.exports = (app) => {
  // Idea API routes
  app.get('/api/ideas', ideasController.getAll)
  app.post('/api/ideas', ideasController.create)
  app.post('/api/ideas/:id/vote', ideasController.upVote)
  app.delete('/api/ideas/:id/vote', ideasController.removeVote)
  app.patch('/api/ideas/:id', ideasController.update)
  app.delete('/api/ideas/:id', ideasController.delete)

  // Comment API routes
  app.get('/api/ideas/:ideaId/comments', commentsController.getAll)
  app.post('/api/ideas/:ideaId/comments', commentsController.create)
  app.delete('/api/ideas/:ideaId/:commentId', commentsController.delete)
}
