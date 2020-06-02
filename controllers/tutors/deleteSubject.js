const Subject = require("../../models/subjects");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.deleteSubject = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }  
    const authHeader = req.headers.authorization;
    const tutorId = req.params.tutorId;
    const subjectId = req.params.subjectId;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user.role != 'tutor'){
                return res.sendStatus(403);
            }
            Subject.deleteOne({_id: subjectId}, (err, result)=>{
                if(err){
                    return res.sendStatus(404);
                }else{
                    res.json({
                        message: 'delete successful',
                        data: result
                    });
                }
            });
        });
    }
}