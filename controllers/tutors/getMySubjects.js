const User = require("../../models/user");
const Subject = require("../../models/subjects");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.getSubjects = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }  
    const authHeader = req.headers.authorization;
    const tutorId = req.params.id;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user.role != 'tutor'){
                return res.sendStatus(403);
            }
            User.findOne({ _id: tutorId }).then((tutor) => {
                Subject.find({tutor_id: tutor._id}).then((result) => {
                    if(!result){
                        return res.sendStatus(500);
                    }
                    res.json({
                        message: "All the subjects you take",
                        data: result
                    });
                }).catch((err) => {console.log(err); return res.sendStatus(401);});
            }).catch((err) => {console.log(err); return res.sendStatus(401);});
        });
    }else{
        res.sendStatus(401);
    }
}