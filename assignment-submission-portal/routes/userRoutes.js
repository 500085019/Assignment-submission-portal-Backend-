const express = require('express');
const { register, login, uploadAssignment, getAllAdmins } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', auth, uploadAssignment);
router.get('/admins', auth, getAllAdmins);

module.exports = router;
