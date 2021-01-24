const {Contract, Component} = require('../models/contract');
const Quote = require('../models/quote');
const {User} = require('../models/user');
const {Milestone} = require('../models/event');
const { successResponse, errorResponse } = require('../middleware/responseFormat');


const getComponent = (req, res) => {
    Component.findOne({"componentType": req.query.componentType})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const createComponent = (req, res) => {
    let newComponent = new Component(req.body);
    newComponent.save()
    .then(success => {
        res.status(201).json(successResponse("Component created successfully", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const updateComponent = (req, res) => {
    Component.findOneAndUpdate(req.params.componentId, {$set: req.body})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getSplashScreen = (req, res) => {
    Contract.findOne({"screenName": "splashScreen"})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getWelcomeScreen = (req, res) => {
    Contract.findOne({"screenName": "welcomeScreen"})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getLoggedInHomeScreen = async(req, res) => {
    const screenContract = await Contract.findOne({"screenName": "loggedInHomeScreen"});
    if(!screenContract){
        res.status(400).json(errorResponse("Error in getting home screen contract", res.statusCode))
    } else {
        let tag= req.query.tag || "Assignment"
        const quote = await Quote.aggregate([{ $match: { quotetag : tag} },{ $sample: { size: 2 } }])
        const user = await User.findOne({"_id": req.user.id})
        const footer = await Component.findOne({"componentType": "bottomTray"});
        console.log(quote);
        const screenContractObject = screenContract.toObject()
        // console.log(screenContractObject.components[1].sections[0].heading3);
        screenContractObject.components[1].sections[0].heading3 = "Welcome "+user.firstName;
        screenContractObject.components[1].sections[1].heading4 = quote;
        screenContractObject.components.push(footer);
        res.status(200).json(successResponse("OK", screenContractObject, res.statusCode));
    }
}

const getPersonalDetailScreen = async(req, res) => {
    const screenContract = await Contract.findOne({"screenName": "personalDetailScreen"});
    if(!screenContract){
        res.status(400).json(errorResponse("Error in getting personal detail screen contract", res.statusCode));
    } else {
        const screenContractObject = screenContract.toObject();
        const user = await User.findOne({"_id": req.user.id});
        const footer = await Component.findOne({"componentType": "bottomTray"});
        screenContractObject.components[1].sections[0].heading4 = JSON.stringify({Name: user.firstName +' '+ user.lastName, 'School/Institute': user.school.schoolName || null, 'ID No.': null})
        screenContractObject.components[1].sections[1].heading4 = JSON.stringify({M: user.phone, E: user.email})
        screenContractObject.components.push(footer);
        res.status(200).json(successResponse("OK", screenContractObject, res.statusCode));
    }
}

const getPersonalDetailUpdateScreen = async (req, res) => {
    const screenContract = await Contract.findOne({"screenName": "personalDetailUpdateScreen"});
    if(!screenContract){
        res.status(400).json(errorResponse("Error in retrieving personal detail update screen contract", res.statusCode))
    } else {
        const screenContractObject = screenContract.toObject();
        const footer = await Component.findOne({"componentType": "bottomTray"});
        screenContractObject.components.push(footer);
        res.status(200).json(successResponse("OK", screenContractObject, res.statusCode));
    }
}

const getStatusUpdateScreen = async (req, res) => {
    const screenContract = await Contract.findOne({"screenName": "eqWellbeingScreen"});
    if(!screenContract){
        res.status(400).json(errorResponse("Error in getting status update screen contract", res.statusCode));
    } else {
        const screenContractObject = screenContract.toObject();
        const milestones = await Milestone.find({student: req.user.id, milestoneIsCompleted: false});
        const footer = await Component.findOne({"componentType": "bottomTray"});
        // console.log(milestones);
        let pendingMilestones = [];
        milestones.map( milestone => {
            pendingMilestones.push({
                milestoneId: milestone._id,
                componentType: "actionCard",
                heading4: "How would rate your "+milestone.milestoneName+"?" ,
                "scrollBar": {
                    "value": milestone.milestoneProgress,
                    "lowerBoundaryLabel": "Awful",
                    "lowerBoundaryValue": "-5",
                    "upperBoundaryLabel": "Amazing",
                    "upperBoundaryValue": "+5"
                }
            })
        })
        screenContractObject.components[1].sections[1].components = pendingMilestones;
        screenContractObject.components.push(footer);
        // console.log(screenContractObject.components[1].sections[1].components);
        // screenContractObject.components[1].sections[1]
        res.status(200).json(successResponse("OK", screenContractObject, res.statusCode));
    }
}

const getMobileNumberEntryScreenContract = (req, res) => {
    const screenContract = Contract.findOne({"screenName": "mobileNumberEntryScreen"})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode))
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getOtpEntryScreen = (req, res) => {
    Contract.findOne({"screenName": "otpEntryScreen"})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse("Could not retrieve requested contract.", res.statusCode))
    })
}

const getRegistrationWelcomeScreen1 = (req, res) => {
    Contract.findOne({"screenName": "registrationWelcomeScreen1"})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
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
    getComponent,
    createComponent,
    updateComponent,
    getSplashScreen,
    getWelcomeScreen,
    getLoggedInHomeScreen,
    getPersonalDetailScreen,
    getPersonalDetailUpdateScreen,
    getStatusUpdateScreen,
    getMobileNumberEntryScreenContract,
    getOtpEntryScreen,
    getRegistrationWelcomeScreen1,
    getContracts,
    registerContract
}