const Quote = require('../models/quote');


const getQuotes = (req, res) => {
    let tag=req.body.quotetag || "Assignment"
  Quote.aggregate([{ $match: { quotetag : tag} },{ $sample: { size: 1 } }])
    .then(success => {
        res.json(success)
    })
    .catch(error=> {
        res.status(400).send("Bad request, users not found.")
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
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}

module.exports = {
    getQuotes,
    registerQuotes
}