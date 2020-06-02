const Subject = require("../../models/subjects");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.category = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }  
    const authHeader = req.headers.authorization;
    const catName = req.params.name;
    const subName = req.body.name;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user.role != 'admin'){
                return res.sendStatus(403);
            }
            Subject.findOne({ name: subName, category_name: catName }).then(subject => {
                //searching for if an object with thesame name and category exist on the database
                if (subject) {
                    return res.status(404).send("Subject has already been created, please create a new subject");
                }
                if(user.role === 'tutor'){  
                    let subject = new Subject({
                        name: subName,
                        category_name: catName,
                        tutor_id: user._id
                    });
                    subject.save((err, doc)=>{
                        if(err){
                            console.log(err);
                            return res.sendStatus(500);
                        }
                        res.json({
                            message: "You have registered a new subject",
                            name: subName
                        });
                    })
                }else{
                    return res.sendStatus(401);
                }
            });
        });
    }else{
        res.sendStatus(401);
    }
}