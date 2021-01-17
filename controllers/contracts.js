const {Contract} = require('../models/contract');
const Quote = require('../models/quote');
const {User} = require('../models/user');
const { successResponse, errorResponse } = require('../middleware/responseFormat');

const getLoggedInHomeScreen = async(req, res) => {
    const screenContract = await Contract.findOne({"screenName": "loggedInHomeScreen"});
    if(!screenContract){
        res.status(400).json(errorResponse("Error in getting home screen contract", res.statusCode))
    } else {
        let tag= req.query.tag || "Assignment"
        const quote = await Quote.aggregate([{ $match: { quotetag : tag} },{ $sample: { size: 2 } }])
        const user = await User.findOne({"_id": req.user.id})
        console.log(quote);
        const screenContractObject = screenContract.toObject()
        // console.log(screenContractObject.components[1].sections[0].heading3);
        screenContractObject.components[1].sections[0].heading3 = "Welcome "+user.firstName;
        screenContractObject.components[1].sections[1].heading4 = quote;
        res.status(200).json(successResponse("OK", screenContractObject, res.statusCode));
    }
}

const getPersonalDetailScreen = async(req, res) => {
    const screenContract = await Contract.findOne({"screenName": "personalDetailScreen"});
    if(!screenContract){
        res.status(400).json(errorResponse("Error in getting personal detail screen contract", res.statusCode));
    } else {
        const screenContractObject = screenContract.toObject();
        const user = await User.findOne({"_id": req.user.id})
        screenContractObject.components[1].sections[0].heading4 = JSON.stringify({Name: user.firstName +' '+ user.lastName, 'School/Institute': user.school.schoolName || null, 'ID No.': null})
        screenContractObject.components[1].sections[1].heading4 = JSON.stringify({M: user.phone, E: user.email})
        res.status(200).json(successResponse("OK", screenContractObject, res.statusCode));
    }
}

const getContracts = (req, res) => {
    Contract.find()
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const registerContract = (req, res) => {
    let newContract = new Contract(req.body);
    newContract.save()
    .then(success => {
        res.status(201).json("New contract created", success, res.statusCode)
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode))
    })
}

module.exports = {
    getLoggedInHomeScreen,
    getPersonalDetailScreen,
    getContracts,
    registerContract
}