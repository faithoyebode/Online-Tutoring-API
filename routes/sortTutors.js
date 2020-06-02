const { query } = require('express-validator');
const sortTutRouter = require("express").Router();
const { sortTutors } = require("../controllers/searchTutors");
sortTutRouter.get('/tutors', [
    query('firstname').trim().escape(),
    query('sort').equals('asc').withMessage("sort query param value must be 'asc'").escape()
], sortTutors);

module.exports = sortTutRouter;