const { body, oneOf, param } = require('express-validator');
const getSubject = require("express").Router();
const {getSubjects} = require("../../controllers/tutors/getMySubjects");

getSubject.get('/tutors/:id/subjects', [
    param('id').not().isEmpty().withMessage('id parameter must not be empty')   
], getSubjects);


module.exports = getSubject; 