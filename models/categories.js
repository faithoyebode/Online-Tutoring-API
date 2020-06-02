const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema, "categories");