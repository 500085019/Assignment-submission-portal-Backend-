const { find, findByIdAndUpdate } = require('../models/Assignment');



const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    try {
        const assignment = new Assignment({ userId: req.user.id, task, admin: adminId });
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' });
        res.status(200).json(admins);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
