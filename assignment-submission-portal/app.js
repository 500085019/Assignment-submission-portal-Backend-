const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const assignmentRoutes = require('./routes/AssignmentRoutes'); // Import assignment routes

dotenv.config()

// Log MONGODB_URI to verify it is being read correctly
console.log('MONGODB_URI from .env:', process.env.MONGODB_URI);

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Mount the routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/assignments', assignmentRoutes); // <-- Add this line to mount the assignment routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
