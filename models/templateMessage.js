const mongoose = require('mongoose');

const templateMessageSchema = new mongoose.Schema({
    template: [{message: {type: String, required: true}, label: {type: String, required: true}}],
    tag: {type: String, required: true, unique: true}
})

module.exports = {
    TemplateMessage: mongoose.model("TemplateMessage", templateMessageSchema)
}