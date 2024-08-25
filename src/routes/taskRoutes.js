const express = require('express');
const router = express.Router();
const { task } = require('../controllers/taskController');

// Define the /api/v1/task route
router.post('/task', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        await task(user_id);
        res.status(200).json({ message: 'Task processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
