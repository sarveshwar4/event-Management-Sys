const Membership = require('../models/Membership');

exports.createMembership = async (req, res) => {
  try {
    const { membershipNumber, name, email, startDate, durationMonths } = req.body;
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + parseInt(durationMonths, 10));

    const membership = new Membership({
      membershipNumber,
      name,
      email,
      startDate: start,
      endDate: end,
    });
    await membership.save();
    res.status(201).json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { extendMonths, cancel } = req.body;
    const membership = await Membership.findById(id);
    if (!membership) return res.status(404).json({ message: 'Not found' });

    if (cancel) {
      membership.status = 'cancelled';
    } else if (extendMonths) {
      membership.endDate.setMonth(membership.endDate.getMonth() + parseInt(extendMonths, 10));
    }

    await membership.save();
    res.json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Not found' });
    res.json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listMemberships = async (req, res) => {
  try {
    if (req.query.number) {
      const m = await Membership.find({ membershipNumber: req.query.number });
      return res.json(m);
    }
    const list = await Membership.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};