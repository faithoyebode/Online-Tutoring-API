const catRoute = require("express").Router();
const { category } = require("../controllers/category");
catRoute.get('/categories', category);

module.exports = catRoute;