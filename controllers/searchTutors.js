const { validationResult } = require('express-validator');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.sortTutors = (req, res) => {  
    /*const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }*/
    const authHeader = req.headers.authorization;
    const tutName = req.query.firstname;
    const sort = req.query.sort;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user.role === 'admin' && sort == ''){
                User.find({role: 'tutor'}).then(tutors => {
                    res.status(200).json({
                        message: 'all tutors',
                        data: tutors
                    });
                }).catch((err)=>{console.log(err);  res.sendStatus(404);});
                return;
            }
            
            User.find({
                firstname: {
                    $regex: tutName,
                    '$options': 'i'
                },
                role: 'tutor'
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
                   message: `all tutors that match the ${tutName} query parameter`,
                    data: result
                });
            }).catch((err)=>{console.log(err);  res.sendStatus(404);});
        });
    }else{
        res.sendStatus(401);
    }
}