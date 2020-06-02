const { validationResult } = require('express-validator');
const Subject = require("../models/subjects");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.sortSubjects = (req, res) => {  
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const authHeader = req.headers.authorization;
    const subName = req.query.name;
    const sort = req.query.sort;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            Subject.find({
                name: {
                    $regex: subName,
                    '$options': 'i'
                }
            }).then(result => {
                result.sort((a,b)=>{
                    if (a.name < b.name){
                        return -1;
                    }
                    if (a.name > b.name){
                        return 1;
                    }
                    return 0;
                });
                res.status(200).json({
                    message: `all subjects that match the ${subName} query parameter`,
                    data: result
                });
            }).catch((err)=>{console.log(err);  res.sendStatus(404);});
        });
    }else{
        res.sendStatus(401);
    }
}