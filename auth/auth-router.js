const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require("../database/db-config");
const {validateUser} = require('../users/users-helpers');

router.post('/register', async (req, res) => {
    let user = req.body;
    const validateResults = validateUser(user);
    
    if (validateResults.isSuccessful) {
        const hash = bcrypt.hashSync(user.password, 10);
        user = {
            ...user,
            password: hash
        };

        
    }
});

router.post('/login', async (req, res) => {

});

module.exports = router;