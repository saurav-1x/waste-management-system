const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Complaint = require('../models/Complaint');
const fs = require('fs');
const path = require('path');

// Get all complaints
router.get('/complaints', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'location.area': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }
    
    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
});

// Update complaint status
router.patch('/complaints/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    complaint.status = status;
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint' });
  }
});

// Delete complaint
router.delete('/complaints/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    // Delete image file if exists
    if (complaint.imagePath) {
      const imagePath = path.join(__dirname, '..', complaint.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await complaint.deleteOne();
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint' });
  }
});

// Bulk forward complaints
router.post('/complaints/bulk-forward', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { complaintIds, municipality } = req.body;
    
    let updateQuery;
    if (complaintIds === 'all') {
      updateQuery = { status: 'Pending' };
    } else {
      updateQuery = { _id: { $in: complaintIds }, status: 'Pending' };
    }
    
    const result = await Complaint.updateMany(updateQuery, { 
      status: 'Forwarded'
    });
    
    res.json({ message: `${result.modifiedCount} complaints forwarded to ${municipality || 'Municipality'}` });
  } catch (error) {
    res.status(500).json({ message: 'Error forwarding complaints' });
  }
});

// Get analytics
router.get('/analytics', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const forwarded = await Complaint.countDocuments({ status: 'Forwarded' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const cancelled = await Complaint.countDocuments({ status: 'Cancelled' });
    
    res.json({ total, pending, forwarded, resolved, cancelled });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

module.exports = router;
