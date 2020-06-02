const Subject = require("../models/subjects");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.allSubjectInCat = (req, res) => {  
    const authHeader = req.headers.authorization;
    const catName = req.params.catname;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            Subject.find({category_name: catName}).then(categories => {
                res.status(200).json({
                    message: `all subjects in ${catName} category`,
                    data: categories
                });
            }).catch((err)=>{console.log(err);  res.sendStatus(404);});
        });
    }else{
        res.sendStatus(401);
    }
}