const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const User = require("../models/user.model");


// admin controller
exports.adminDashboard = (req, res) => {
    if (req.user.role.toLowerCase() === 'admin') {
        res.send(
            {
            success: true,
            message: 'Admin Dashboard',
            user: {
                id: req.user._id,
                username: req.user.username,
                role: req.user.role,
            },
             
        }
       );
    } else {
        res.status(403).json({ message: 'Permission Denied: Access restricted.' });
    }
};


exports.showEmployee = async (req, res) => {
    if (req.user.role.toLowerCase() === 'admin') {
        try{
            const showEmpDetails = await User.find()
            res.json(showEmpDetails);
        }
        catch{
            console.error(error);
            res.status(500).send('Error retrieving employee details');
        }        
    } else {
        res.status(403).json({ message: 'Permission Denied: Access restricted.' });
    }
};



//admin route for showing new registration waiting for approve

exports.showNewRegistration = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ message: 'Permission Denied: Access restricted.' });
        }

        // Retrieve all users with unapproved registrations
        const newRegistrations = await User.find({ isApproved: false });

        // Omit sensitive information from the response
        const registrationsWithoutPassword = newRegistrations.map(user => {
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            delete userWithoutPassword.tokens;
            return userWithoutPassword;
        });

        // Send the list of new registrations in the response
        res.json(registrationsWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving new registrations' });
    }
};




// Admin route for approving/rejecting user registrations
exports.approveRegistration = async (req, res) => {
    if (req.user.role.toLowerCase() === 'admin') {
        const { username, isApproved } = req.body;

        try {
            const user = await User.findOne({username})

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.isApproved = isApproved;
            await user.save();

            return res.json({ message: `User registration ${isApproved ? 'approved' : 'rejected'}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error processing approval' });
        }
    } else {
        res.status(403).json({ message: 'Permission Denied: Access restricted.' });
    }
};