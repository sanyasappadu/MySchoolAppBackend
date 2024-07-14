const express = require('express');
const router = express.Router();
const {
    createComplaint,
    getComplaints,
    getComplaintById,
    deleteComplaint,
} = require('../controllers/complaint'); // Adjust the path as needed

// Create a new complaint
router.post('/', createComplaint);

// Get all complaints
router.get('/', getComplaints);

// Get a complaint by ID
router.get('/:id', getComplaintById);

// Delete a complaint by ID
router.delete('/:id', deleteComplaint);

module.exports = router;
