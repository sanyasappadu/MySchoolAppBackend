const Admission = require('../models/Admission'); // Adjust the path as needed

// Create a new leave letter
const createAdmission = async (req, res) => {
    const { name, idnumber, startDate, endDate, description, class: className } = req.body;
    try {
        const newAdmission = new Admission({name, idnumber, startDate, endDate, description, class: className,});
        const savedAdmission = await newAdmission.save();
        res.status(201).json(savedAdmission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all leave letters
const getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find();
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a leave letter by ID
const getAdmissionById = async (req, res) => {
    const { id } = req.params;
    try {
        const admission = await Admission.findById(id);
        if (!admission) {
            return res.status(404).json({ message: 'Leave letter not found' });
        }
        res.status(200).json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a leave letter by ID
const deleteAdmission= async (req, res) => {
    const { id } = req.params;
    try {
        const admission = await Admission.findByIdAndDelete(id);
        if (!admission) {
            return res.status(404).json({ message: 'Leave letter not found' });
        }
        res.status(200).json({ message: 'Leave letter deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAdmission,
    getAdmissions,
    getAdmissionById,
    deleteAdmission,
};
