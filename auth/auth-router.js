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
            const token = getJwtToken(saved.username);
            res.status(201).json({ user: saved, token });
        } catch (error) {
            console.log(`\nError: POST to /api/auth/register\n${error}\n`);
            res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.status(400).json({ message: "Invalid user information", errors: validateResults.errors });
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await Users.findBy({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = getJwtToken(username);
            res.status(200).json({
                message: `Welcome to the site, ${username}!`,
                token
            });
        } else {
            res.status(401).json({ message: "Invalid credentials." });
        }
    } catch (error) {
        console.log(`\nError: POST to /api/auth/login\n${error}\n`);
        res.status(500).json({ message: "Internal server error." });
    }
});

function getJwtToken(username) {
    const payload = {
        username,
        department: "Engineering"
    };

    const secret = process.env.JWT_SECRETE || "make sure it's a secret please";

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;