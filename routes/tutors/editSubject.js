const { body, param } = require('express-validator');
const editSubject = require("express").Router();
const {editSubjects} = require("../../controllers/tutors/editSubjects");
const {deleteSubject} = require("../../controllers/tutors/deleteSubject");

editSubject.put('/tutors/:tutorId/subjects/:subjectId', [
    param('tutorId').not().isEmpty().withMessage('tutor id parameter must not be empty'),
    param('subjectId').not().isEmpty().withMessage('subject id parameter must not be empty'),
    body('name').not().isEmpty().withMessage('pass in the name you want to change this particular subject to')    
], editSubjects);

editSubject.delete('/tutors/:tutorId/subjects/:subjectId', [
    param('tutorId').not().isEmpty().withMessage('tutor id parameter must not be empty'),
    param('subjectId').not().isEmpty().withMessage('subject id parameter must not be empty'),    
], deleteSubject);

module.exports = editSubject; 