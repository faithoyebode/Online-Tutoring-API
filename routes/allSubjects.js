const { param, oneOf } = require('express-validator');
const allSubject = require("express").Router();
const { allSubjectInCat } = require("../controllers/allSubjects");
allSubject.get('/categories/:catname/subjects', [
    oneOf([
        param('catname').equals('primary'),
        param('catname').equals('jss'),
        param('catname').equals('ss'),
    ], "Invalid role: role can either be 'primary', 'jss' or 'ss'"),
], allSubjectInCat);

module.exports = allSubject;