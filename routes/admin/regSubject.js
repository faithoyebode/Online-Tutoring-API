const { body, oneOf, param } = require('express-validator');
const regSubject = require("express").Router();
const {category} = require("../../controllers/admin/addSubject");

regSubject.post('/categories/:name/subjects/register', [
    param('name').not().isEmpty().withMessage('name parameter must not be empty'),
    body('name').not().isEmpty().withMessage('name field i.e. subject name must be included in request body'),
    oneOf([
        param('name').equals('primary'),
        param('name').equals('js'),
        param('name').equals('ss'),
    ], "Invalid url parameter: it can either be 'primary', 'js' or 'ss'")
    
], category);


module.exports = regSubject; 