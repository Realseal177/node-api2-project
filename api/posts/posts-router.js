const Post = require('./posts-model');
const router = require('express').Router();

router.get('/', (req, res) => {
    Post.find()
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
  
  router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
    Post.insert(req.body)
      .then(posts => {
            res.status(201).json({
                id: posts.id,
                ...req.body
            })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Please provide title and contents for the post',
        });
      });
    }
  });
  
  router.delete('/:id', async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            await Post.remove(req.params.id);
            res.status(200).json(post)
        }
      } catch (error) {
        res.status(500).json({
          message: 'The post could not be removed',
        })
      }
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    if (!changes.title || !changes.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Post.update(req.params.id, changes)
        .then(updatedPost => {
            if (!updatedPost) {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else {
                res.status(200).json({
                    ...changes,
                    id: Number(req.params.id)
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be modified" })
        })
    }
  });

  router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
  })

  module.exports = router;