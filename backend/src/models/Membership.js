const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  membershipNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Membership', MembershipSchema);