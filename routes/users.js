const express = require('express');
const UserModel = require ('../models/users');
const router = express.Router();

// List All Users
router.get('/', (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) return res.send(err); // eb3at el error da lel frontend
        res.json(users); // lw mafesh error hab3at el data bta3et el users
    });
    // res.send(`hello GET /users`)
});

// List One User By id
router.get("/:id", (req, res) => {
    UserModel.findById(req.params.id, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

// Add User
router.get('/:id', (req, res) => {
    const { body: {firstName, lastName, email, password, posts}} = req;
    const user = new UserModel({
        firstName,
        lastName,
        email,
        password,
        posts, 
    });
    user.save((err,user) => {
        if (err) return res.send(err);
        res.json(user);
    });
    // res.send(`hello GET /users/${req.params.id}`)
});

// Edit User Data
router.patch('/:id', (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err,user) => {
        if (err) return res.send(err);
        res.json(user);
    });
    // res.send(`hello PATCH /users/${req.params.id}`)
});

// Remove User
router.delete('/:id', (req, res) => {
    UserModel.findByIdAndRemove(req.params.id, req.body, (err,user) => {
        if (err) return res.send(err);
        res.json(user);
    });
    // res.send(`hello DELETE /users/${req.params.id}`)
})

module.exports = router;