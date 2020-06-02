const Subject = require("../../models/subjects");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.updateSubject = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }  
    const authHeader = req.headers.authorization;
    const catName = req.params.catname;
    const subjectId = req.params.subjectId;
    const name = req.body.name;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user.role != 'admin'){
                return res.sendStatus(403);
            }
            Subject.findOneAndUpdate({_id: subjectId}, {name: name}, { new: true, useFindAndModify: false}, (err, result)=>{
                if(err){
                    return res.sendStatus(404);
                }else{
                    res.json({
                        message: 'update successful',
                        data: result
                    });
                }
            });
        });
    }
}