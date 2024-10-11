const { find, findByIdAndUpdate } = require('../models/Assignment');

async function getAssignments(req, res) {
    try {
        const assignments = await find({ admin: req.user.id }).populate('userId', 'name');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function acceptAssignment(req, res) {
    try {
        await findByIdAndUpdate(req.params.id, { status: 'Accepted' });
        res.status(200).json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function rejectAssignment(req, res) {
    try {
        await findByIdAndUpdate(req.params.id, { status: 'Rejected' });
        res.status(200).json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Export the functions using CommonJS syntax
module.exports = { getAssignments, acceptAssignment, rejectAssignment };
