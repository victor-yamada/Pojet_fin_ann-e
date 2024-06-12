const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController =require('../controllers/auth');

router.post(
    '/login',
    [
        body('name').trim().not().isEmpty(),
        body('email')
            .isEmail()
            .withMessage('Veuillez entrez un email valide')
            .custom(async (email) => {
                const user = await User.find(email);
                if (user[0].lenght > 0) {
                    return Promise.reject('Cette adresse email existe déjà !')
                }
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 7})
    ], 
    authController.login
);

module.exports = router;
