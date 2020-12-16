const Quote = require('../models/quote');
const {successResponse, errorResponse} = require("../middleware/responseFormat");

const getQuotes = (req, res) => {
    console.log(req)
    let tag= req.query.tag || "Assignment"
    Quote.aggregate([{ $match: { quotetag : tag} },{ $sample: { size: 2 } }])
    .then(success => {
        res.status(200).json(successResponse("", success, res.statusCode))
    })
    .catch(error=> {
        res.status(400).json(errorResponse(error, res.statusCode))
    })
}
// For each request we're the same user


const registerQuotes = (req, res) => {
    let quote  = new Quote({
        quoteName: req.body.quoteName,
        quotetag: req.body.quotetag
    })
    quote.save()
    .then(success=> {
        res.status(200).json(successResponse("Quote added successfully.", success, res.statusCode))
    })
    .catch(error=> {
        res.status(400).json(errorResponse("Could not add quote to the system.", res.statusCode))
    })
}

module.exports = {
    getQuotes,
    registerQuotes
}