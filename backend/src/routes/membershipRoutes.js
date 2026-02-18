const express = require('express');
const router = express.Router();
const {
  createMembership,
  updateMembership,
  getMembership,
  listMemberships,
} = require('../controllers/membershipController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin'), createMembership);
router.put('/:id', protect, authorize('admin'), updateMembership);
router.get('/', protect, authorize('admin'), listMemberships);
router.get('/:id', protect, getMembership);

module.exports = router;