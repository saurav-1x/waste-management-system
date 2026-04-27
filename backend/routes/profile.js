const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  role: user.role,
  createdAt: user.createdAt
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(toPublicUser(user));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

router.patch('/', authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      return res.status(400).json({ message: 'Email cannot be changed after registration' });
    }

    if (user.phone && phone && phone !== user.phone) {
      return res.status(400).json({ message: 'Phone number cannot be changed after it is saved once' });
    }

    if (name?.trim()) user.name = name.trim();
    if (!user.phone && phone?.trim()) user.phone = phone.trim();
    user.address = address?.trim() || '';

    await user.save();

    res.json(toPublicUser(user));
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
