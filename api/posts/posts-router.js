const Post = require('./posts-model');
const router = require('express').Router();

router.get('/', (req, res) => {
    Post.find(req.query)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The posts information could not be retrieved',
        });
      });
  });
  
  router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be retrieved',
        });
      });
  });
  
  router.get('/:id/dogs', (req, res) => {
    Post.findDogs(req.params.id)
      .then(dogs => {
        if (dogs.length > 0) {
          res.status(200).json(dogs);
        } else {
          res.status(404).json({ message: 'No dogs for this posts' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the dogs for this posts',
        });
      });
  });
  
  router.post('/', (req, res) => {
    Post.add(req.body)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the posts',
        });
      });
  });
  
  router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The posts has been nuked' });
        } else {
          res.status(404).json({ message: 'The posts could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the posts',
        });
      });
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    Post.update(req.params.id, changes)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'The posts could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the posts',
        });
      });
  });

  module.exports = router;