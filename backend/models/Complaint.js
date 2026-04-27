const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    area: String,
    city: String
  },
  description: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Forwarded', 'Resolved', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
