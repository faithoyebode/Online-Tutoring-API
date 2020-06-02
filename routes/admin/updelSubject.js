const { body, param, oneOf } = require('express-validator');
const updelSubject = require("express").Router();
const {updateSubject} = require("../../controllers/admin/updateSubject");
const {deleteSubject} = require("../../controllers/admin/deleteSubject");

updelSubject.put('/categories/:catname/subjects/:subjectId', [
    oneOf([
        param('catname').equals('primary'),
        param('catname').equals('jss'),
        param('catname').equals('ss'),
    ], "Invalid category: category can either be 'primary', 'jss' or 'ss'"),
    param('subjectId').not().isEmpty().withMessage('subject id parameter must not be empty'),
    body('name').not().isEmpty().withMessage('pass in the name you want to change this particular subject to')    
], updateSubject);

updelSubject.delete('/categories/:catname/subjects/:subjectId', [
    oneOf([
        param('catname').equals('primary'),
        param('catname').equals('jss'),
        param('catname').equals('ss'),
    ], "Invalid category: category can either be 'primary', 'jss' or 'ss'"),
    param('subjectId').not().isEmpty().withMessage('subject id parameter must not be empty'),    
], deleteSubject);

module.exports = updelSubject; 