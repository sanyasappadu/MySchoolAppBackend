const express = require('express');
const router = express.Router();
const {
    createAdmission,
    getAdmissions,
    getAdmissionById,
    deleteAdmission,
} = require('../controllers/admission'); // Adjust the path as needed

// Create a new leave letter
router.post('/', createAdmission);

// Get all leave letters
router.get('/', getAdmissions);

// Get a leave letter by ID
router.get('/:id', getAdmissionById);

// Delete a leave letter by ID
router.delete('/:id', deleteAdmission);

module.exports = router;
