const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lessonSchema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    subject_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Lesson", lessontSchema, "lessons");