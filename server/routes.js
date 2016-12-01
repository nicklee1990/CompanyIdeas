const ideasController = require('./controllers/ideas')

module.exports = (app) => {
  // Idea API routes
  app.get('/api/ideas', ideasController.getAll)
  app.post('/api/ideas', ideasController.create)
  app.patch('/api/ideas/:id', ideasController.update)
  app.delete('/api/ideas/:id', ideasController.delete)
}
