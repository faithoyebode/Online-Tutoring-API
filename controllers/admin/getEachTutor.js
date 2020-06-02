const User = require("../../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.getTutors = (req, res) => {  
    const authHeader = req.headers.authorization;
    const tutorId = req.params.tutorId;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user.role != 'admin'){
                return res.sendStatus(403);
            }
            User.find({_id: tutorId, role: 'tutor'}).then(tutor => {
                res.status(200).json({
                    message: 'successful request',
                    data: tutor
                });
            }).catch((err)=>{console.log(err);  res.sendStatus(404);});
        });
    }else{
        res.sendStatus(401);
    }
}