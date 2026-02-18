require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => res.send('Event Management API'));

module.exports = app;