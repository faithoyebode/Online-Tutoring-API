const getTutsrouter = require("express").Router();
const {getTutors} = require("../../controllers/admin/getAllTutors");

getTutsrouter.get('/tutors', getTutors)


module.exports = getTutsrouter; 