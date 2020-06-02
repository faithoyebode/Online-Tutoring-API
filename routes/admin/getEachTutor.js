const { param } = require('express-validator');
const getEachTutsrouter = require("express").Router();
const {getEachTutors} = require("../../controllers/admin/getAllTutors");

getEachTutsrouter.get('/tutors/:tutorId', [
    param('tutorId').not().isEmpty().withMessage('name parameter must not be empty')
], getEachTutors)


module.exports = getEachTutsrouter; 