const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const email = req.query.email;
    const password = req.query.password;
    //If all the fields are filled
    User.findOne({ email }).then(user => {
        //If there is no record of the user on the database
        if (!user) {
            return res.status(404).send("User not found, please provide valid credentials");
        }
        // If there is a record, record is gotten and passwords are compared
        bcrypt.compare(password, user.password).then(valid => {
            //If the password used doesn't correlate with the one on the database
            if (!valid) {
                return res.status(403).send("Incorrect email or password, please review details and try again");
            }
            //User is authenticated, issue a token
            const token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "5hr" });
            res.status(200).send({
                _id: user._id,
                token
            });
        });
    }).catch(err => console.log(err));
}