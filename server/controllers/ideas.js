const Idea = require('../models/Idea').model

exports.getAll = (req, res) => {
  Idea.find({}, 'author name description imageUrl createdAt').exec().then((result, err) => res.send({ data: result }))
}

exports.create = (req, res) => {
  // Validate the request
  req.checkBody('name', 'Invalid name').notEmpty()
  req.checkBody('description', 'Invalid description').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      let errors = result.mapped()
      Object.keys(errors).forEach((key) => {
        errors[key] = errors[key].msg
      })
      res.status(400).json(errors)
    } else {
      let idea = new Idea({
        name: req.body.name,
        description: req.body.description,
        status: 'open',
        votes: 0,
        author: 'Nicholas Lee' /* TODO: Get logged in user */
        // TODO: Add current author image
      })

      // Save the object
      idea.save().then((data) => {
        res.json(data)
      }).catch((err) => {
        console.log(err)
        res.status(400).send('There was an error saving the idea')
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

// TODO: Ensure the user is assigned
exports.upVote = (req, res) => {
  Idea.findById(req.params.id, function (err, idea) {
    if (err) {
      res.status(400).send('There was an error voting for the idea')
    } else{
      idea.update({$inc: {
        votes: 1
      }});

      res.send(200).send('Updated')
    }
  });
}

exports.removeVote = (req, res) => {
  Idea.findById(req.params.id, function (err, idea) {
    if (err) {
      res.status(400).send('There was an error removing your vote the idea')
    } else{
      idea.update({$dec: {
        votes: 1
      }});

      res.send(200).send('Updated')
    }
  });
}
