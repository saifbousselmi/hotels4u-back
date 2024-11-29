const jwt = require('jsonwebtoken');
const Hotel = require('../models/hotel');  // Assuming the Hotel model is imported



// Admin check middleware
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ errors: [{ msg: "Access denied, admin only." }] });
    }
    next();
};

const isOwner = (req, res, next) => {
    if (req.user.role !== 'owner') {
        return res.status(403).send({ errors: [{ msg: "Access denied, owners only." }] });
    }
    next();
};

module.exports = { isAdmin, isOwner };

