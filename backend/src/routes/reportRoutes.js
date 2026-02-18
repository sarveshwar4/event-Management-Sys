const express = require('express');
const router = express.Router();
const { getReports } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getReports);

module.exports = router;