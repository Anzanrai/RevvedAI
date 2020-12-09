const express = require('express');
const router = express.Router();

const Quote = require("../models/quote");
//const getQuotes = require("../controllers/quoteController");
const { getQuotes,registerQuotes } = require('../controllers/quoteController');


router.get('/', getQuotes);
router.post('/', registerQuotes);


module.exports = router;