const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// 1. Upload an Assignment
router.post('/', async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Get Assignments for an Admin
router.get('/admin/:adminName', async (req, res) => {
    try {
        const assignments = await Assignment.find({ admin: req.params.adminName });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Accept or Reject an Assignment
router.patch('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) return res.status(404).send('Assignment not found');
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
