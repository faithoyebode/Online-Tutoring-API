const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    tutor_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Subject", subjectSchema, "subjects");