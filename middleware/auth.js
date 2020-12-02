const User = require('../models/user');
const auth = (req, res, next) => {
    let token = req.cookies.authToken || req.headers["x-access-token"] || req.headers["authorization"]
    
    if(!token) return res.status(401).send("Access denied. No token provided.");

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        console.log(user);
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token
        req.user = user;
        next();
    });

    // try {
    //     //if can verify the token, set req.user and pass to next middleware
    //     const decoded = jwt.verify(token, process.env.SECRETE);
    //     // console.log("At auth middleware", req.user);
    //     req.user = decoded;
    //     next();
    //   } catch (ex) {
    //     //if invalid token
    //     res.status(400).send("Invalid token.");
    //   }
}
module.exports = { auth }