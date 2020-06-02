const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    _id: {
        type: Number
    },
    lesson_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");