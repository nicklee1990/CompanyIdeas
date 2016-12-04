const Idea = require('../models/Idea').model
const Comment = require('../models/Comment').model

exports.getAll = (req, res) => {
  const ideaId = req.params.ideaId
  Idea.findById(ideaId, 'comments').then((idea) => res.send({ data: idea.comments }))
}

exports.create = (req, res) => {
  // Validate the request
  req.checkBody('text', 'Invalid comment').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      let errors = result.mapped()
      Object.keys(errors).forEach((key) => {
        errors[key] = errors[key].msg
      })
      res.status(400).json(errors)
    } else {
      // Push the comment into the comment list
      const ideaId = req.params.ideaId
      const comment = new Comment({
        text: req.body.text,
        author: 'Nicholas Lee' /* TODO: Get logged in user */
      })

      Idea.findById(ideaId).then((idea) => {
        idea.comments.push(comment)

        // Save the object
        idea.save().then((data) => {
          res.json(comment)
        }).catch((err) => {
          console.log(err)
          res.status(400).send('There was an error saving the comment')
        })
      })
    }
  })
}

exports.update = (req, res) => {
  res.send(req.query)
}

exports.delete = (req, res) => {
  res.send(req.query)
}
