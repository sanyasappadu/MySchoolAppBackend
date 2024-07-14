const Complaint = require('../models/Complaint'); // Adjust the path as needed

// Create a new complaint
const createComplaint = async (req, res) => {
    const { name, idnumber, class: className, description } = req.body;

    try {
        const newComplaint = new Complaint({
            name,
            idnumber,
            class: className,
            description,
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all complaints
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a complaint by ID
const getComplaintById = async (req, res) => {
    const { id } = req.params;

    try {
        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a complaint by ID
const deleteComplaint = async (req, res) => {
    const { id } = req.params;

    try {
        const complaint = await Complaint.findByIdAndDelete(id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComplaint,
    getComplaints,
    getComplaintById,
    deleteComplaint,
};
