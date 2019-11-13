const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const { validateUser } = require('../users/users-helpers');

router.post('/register', async (req, res) => {
    let user = req.body;
    const validateResults = validateUser(user);

    if (validateResults.isSuccessful) {
        const hash = bcrypt.hashSync(user.password, 10);
        user = {
            ...user,
            password: hash
        };

        try {
            const saved = await Users.add(user);
            res.status(201).json(saved);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(400).json({ message: "Invalid user information", errors: validateResults.errors });
    }
});

router.post('/login', async (req, res) => {

});

module.exports = router;