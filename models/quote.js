const mongoose = require('mongoose');
//const async = require('async');

const QuoteSchema = new mongoose.Schema({
    quoteName: {type:String},
    quotetag:{
        type: String,
        enum:['Assignment','Test','Projects'],
        required: true},
});


const quote = mongoose.model('Quote', QuoteSchema)

module.exports=quote