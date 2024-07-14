const express = require('express');
const router = express.Router();
const {
    createLeaveLetter,
    getLeaveLetters,
    getLeaveLetterById,
    deleteLeaveLetter,
} = require('../controllers/leaveletter'); // Adjust the path as needed

// Create a new leave letter
router.post('/', createLeaveLetter);

// Get all leave letters
router.get('/', getLeaveLetters);

// Get a leave letter by ID
router.get('/:id', getLeaveLetterById);

// Delete a leave letter by ID
router.delete('/:id', deleteLeaveLetter);

module.exports = router;
