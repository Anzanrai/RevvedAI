const User = require('../models/user');
const { json } = require('body-parser');

// to list out users
const getUsers = (req, res) => {
    User.find()
    .then(success => {
        res.json(success)
    })
    .catch(error=> {
        res.status(400).send("Bad request, users not found.")
    })
}

// for retrieving user with a particular id
const getUserById = (req, res) => {
    User.findById(req.params.id)
    .then(success=> {
        res.json(success)
    })
    .catch(error=> {
        res.status(404).send("User not found")
    })
}

// create a new user or register a new user
const registerUser = (req, res) => {
    let user = new User(req.body)
    user.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}

module.exports = {
    getUsers,
    getUserById,
    registerUser
}