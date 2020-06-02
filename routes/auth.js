const { check, oneOf, query } = require('express-validator');
const router = require("express").Router();
const {signUp} = require("../controllers/signUp");
const {login} = require("../controllers/login");
router.post('/signup', [
    check('firstname').not().isEmpty().withMessage('firstname must not be empty').isAlpha().withMessage('firstname must contain only alphabets').trim().escape(),
    check('lastname').not().isEmpty().withMessage('lastname must not be empty').isAlpha().withMessage('lastname must contain only alphabets').trim().escape(),
    check('email').not().isEmpty().withMessage('email must not be empty').isEmail().withMessage('Add a proper email').trim().escape(),
    check('password').not().isEmpty().withMessage('password must not be empty').trim().escape(),
    check('role').not().isEmpty().withMessage('role must not be empty'),
    oneOf([
        check('role').equals('student'),
        check('role').equals('tutor'),
        check('role').equals('admin'),
    ], "Invalid role: role can either be 'student' or 'tutor'")
    
], signUp);

router.get('/login', [
    query('email').not().isEmpty().withMessage('email must not be empty').isEmail().withMessage('Add a proper email').trim().escape(),
    query('password').not().isEmpty().withMessage('password must not be empty').trim().escape()
], login)


module.exports = router; 