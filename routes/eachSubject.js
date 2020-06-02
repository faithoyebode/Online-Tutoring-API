const { param, oneOf } = require('express-validator');
const eachSubject = require("express").Router();
const { eachSubjectInCat } = require("../controllers/eachCategory");
eachSubject.get('/categories/:catname/subjects/:subjectId', [
    oneOf([
        param('catname').equals('primary'),
        param('catname').equals('jss'),
        param('catname').equals('ss'),
    ], "Invalid category: category can either be 'primary', 'jss' or 'ss'"),
    param('subjectId').not().isEmpty().withMessage('subject id parameter must not be empty')
], eachSubjectInCat);

module.exports = eachSubject;