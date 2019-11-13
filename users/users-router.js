const router = require('express').Router();

const Users = require("./users-model");
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, async (req, res) => {
    const { department } = req.body;
    try {
        const users = await Users.findBy({ department });
        res.status(200).json(users);
    } catch (error) {
        console.log(`\nError in GET to /api/users/:\n${error}\n`);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;

// function checkDepartment(department) {
//     return (req, res, next) => {
//         if (req.body.department === )
//     };
// }