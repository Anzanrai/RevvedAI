const mongooseUniqueValidator = require("mongoose-unique-validator");

const mongoose = require('mongoose');

const componentSchema = mongoose.Schema({
    componentType: {type: String, unique: true}
}, {strict: false})

const contractSchema = mongoose.Schema({
    screenName: {type: String, unique: true},
    components: [
        {
            componentType: {type: String},

        }
    ],
    action: {
        screenName: {type: String},
        backNavigation: {
            screenName: {
                type: String
            }
        }
    }
}, {strict: false})

module.exports = {
    Contract: mongoose.model("Contract", contractSchema),
    Component: mongoose.model("Component", componentSchema)
}