const { query } = require('express-validator');
const sortSubRouter = require("express").Router();
const { sortSubjects } = require("../controllers/searchSubject");
sortSubRouter.get('/subjects', [
    query('name').not().isEmpty().withMessage('name query param must not be empty').trim().escape(),
    query('sort').not().isEmpty().withMessage('sort query param must not be empty').equals('asc').withMessage("sort query param value must be 'asc'").escape()
], sortSubjects);

module.exports = sortSubRouter;