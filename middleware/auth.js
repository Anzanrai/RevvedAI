const {User} = require('../models/user');
const {check} = require("express-validator");

const auth = (req, res, next) => {
    // let token = req.cookies.authToken || req.headers["x-access-token"] || req.headers["authorization"]
    let token = req.headers["x-access-token"] || req.headers["authorization"]
    
    if(!token) return res.status(401).send("Access denied. No token provided.");

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        console.log(user);
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token
        req.user = user;
        next();
    });
}
module.exports = { 
    auth
}