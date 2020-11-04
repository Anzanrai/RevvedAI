const express = require('express');
const router = express.Router();

const User = require("../models/user");

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.send("Error"+error);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.send("Error"+error);
    }
})

router.post('/', async(req, res) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    })
    try {
        const userResponse = user.save()
        res.json(userResponse);
    } catch (error) {
        res.send("Error"+error);
    }
})

module.exports = router;