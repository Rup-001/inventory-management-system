const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const User = require("../models/user.model");



// protected profile controller for device
exports.deviceProfile = (req, res) => {
    if (req.user.role.toLowerCase() === 'employee' &&
        req.params.username.toLowerCase() === req.user.username.toLowerCase()) {
        res.send({
            success: true,
            message: `employee profile for ${req.params.username}`,
            user: {
                id: req.user._id,
                username: req.user.username,
                role: req.user.role,
            },
        });
    } else {
        res.status(403).json({ message: 'Permission Denied: Access restricted.' });
    }
};


// protected profile controller for It
exports.itProfile = (req, res) => {
    if (req.user.role.toLowerCase() === 'it' &&
        req.params.username.toLowerCase() === req.user.username.toLowerCase()) {
        res.send({
            success: true,
            message: `IT profile for ${req.params.username}`,
            user: {
                id: req.user._id,
                username: req.user.username,
                role: req.user.role,
            },
        });
    } else {
        res.status(403).json({ message: 'Permission Denied: Access restricted.' });
    }
};
