const express = require('express');
const router = express.Router();
const prisma = require('../prisma');


router.get('/', async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
});

module.exports = router;