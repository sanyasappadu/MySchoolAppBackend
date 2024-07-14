const Leaveletter = require('../models/LeaveLetter'); // Adjust the path as needed

// Create a new leave letter
const createLeaveLetter = async (req, res) => {
    const { name, idnumber, startDate, endDate, description, class: className } = req.body;
    try {
        const newLeaveLetter = new Leaveletter({name, idnumber, startDate, endDate, description, class: className,});
        const savedLeaveLetter = await newLeaveLetter.save();
        res.status(201).json(savedLeaveLetter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all leave letters
const getLeaveLetters = async (req, res) => {
    try {
        const leaveLetters = await Leaveletter.find();
        res.status(200).json(leaveLetters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a leave letter by ID
const getLeaveLetterById = async (req, res) => {
    const { id } = req.params;
    try {
        const leaveLetter = await Leaveletter.findById(id);
        if (!leaveLetter) {
            return res.status(404).json({ message: 'Leave letter not found' });
        }
        res.status(200).json(leaveLetter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a leave letter by ID
const deleteLeaveLetter = async (req, res) => {
    const { id } = req.params;
    try {
        const leaveLetter = await Leaveletter.findByIdAndDelete(id);
        if (!leaveLetter) {
            return res.status(404).json({ message: 'Leave letter not found' });
        }
        res.status(200).json({ message: 'Leave letter deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLeaveLetter,
    getLeaveLetters,
    getLeaveLetterById,
    deleteLeaveLetter,
};
