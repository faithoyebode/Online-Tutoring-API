const Category = require("../models/categories");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.category = (req, res) => {  
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            console.log(user);
            Category.find().then(categories => {
                res.status(200).json({
                    data: categories
                });
            })
        });
    } else {
        res.sendStatus(401);
    }
}