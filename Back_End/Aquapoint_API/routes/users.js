const express = require('express');
const router = express.Router();
const prisma = require('../prisma');


// GET /users
router.get('/', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
});

// GET /users/{id}
router.get('/:id', async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });

        if(!user) return res.status(404).json({ error: 'User not found' })

        res.json(user);
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})

// GET /users/email/{email}
router.get('/email/:email', async (req, res) => {
    try{
        const user = await prisma.user.findFirst({
            where: { email: req.params.email}
        });

        if(!user) return res.status(404).json({ error: 'User not found' })

        res.json(user);
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})


// POST /users
router.post('/', async (req, res) => {
    try{
        const user = await prisma.user.create({
            data: {
                ...req.body,
                createdAt: new Date()
            }
        })

        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})


// PUT /users/:id
router.put('/:id', async (req, res) => {
    try{
        const findUser = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        })

        if(!findUser) return res.status(404).json({ error: `User not found with id: ${id}`})

        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body
        })
        
        res.json(updatedUser)
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})


// DELETE /users/:id
router.delete('/:id', async (req, res) => {
    try{
        const findUser = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        })

        if(!findUser) return res.status(404).json({ error: `User not found with id: ${id}`})
        
        await prisma.user.delete({
            where: { id: Number(req.params.id) }
        })

        res.json({ message: `User deleted successfully`})
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;