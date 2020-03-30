const express = require('express')
const PostModel = require ('../models/posts')
const router = express.Router();

// Common Rest Structer
// listing          GET/resource
// list one         GET/resource/id
// add              POST/resource
// edit             PATCH/resource/id
// remove           DELETE/resource/id

//  List All Posts
router.get('/', (req, res) => {
    PostModel.find({}, (err, posts) => {
        if (err) return res.send(err); 
        res.json(posts); 
    });
    // res.send(`hello GET /posts`)
});

// List One Post By id
router.get('/:id', (req, res) => {
    PostModel.findById(req.params.id, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
    //res.send(`hello GET /posts/${req.params.id}`)
});

// Add Post 
router.post('/', (req, res) => {
    const {
        body: { title, content }
    } = req;
    const post = new PostModel({
        title,
        content
    });
    post.save((err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
    //res.send('hello POST /posts')
});

// Edit Post
router.patch('/:id', (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, req.body, (err,post) => {
        if (err) return res.send(err);
        res.json(post);
    });
    //res.send(`hello PATCH /posts/${req.params.id}`)
});

// Remove Post
router.delete('/:id', (req, res) => {
    PostModel.findByIdAndRemove(req.params.id, req.body, (err,post) => {
        if (err) return res.send(err);
        res.json(post);
    });
    // res.send(`hello DELETE /posts/${req.params.id}`)
});

module.exports = router;
