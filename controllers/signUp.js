const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const User = require("../models/user");
exports.signUp = (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            return res.sendStatus(500);
        }
        let user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
            role: role
        });
        user.save((err, doc)=>{
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.json({
                message: "You are now a registered user. You can login now",
                email: email
            });
        }); 
    });
};