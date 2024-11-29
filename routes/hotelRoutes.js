const express = require('express');
const { test, addHotel, getHotels, getHotelById, deleteHotel, editHotel, getMyHotels } = require('../controllers/hotelControllers');
const { isAdmin, isOwner } = require("../middlewares/Role");
const isAuth = require('../middlewares/isAuth');
const { authMiddleware, roleMiddleware } = require('../middlewares/Auth');

const Router = express.Router();

// Test Route
Router.get('/test', test);

// Add Hotel (only for owners and admins)
Router.post('/add-Hotel', isAuth, (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'owner' ) {
        next(); // Proceed to add hotel
    } else {
        res.status(403).json({ msg: "You are not authorized to add hotels" });
    }
}, addHotel);

// Get All Hotels (any user can view)
Router.get('/get-Hotels', getHotels);

// Get a Single Hotel by ID (any user can view)
Router.get('/get-Hotel/:id', getHotelById);

// Delete Hotel (only for admins or hotel owners)
// Updated delete route
Router.delete('/delete-Hotel/:id', deleteHotel);

// Edit Hotel (only for admins or hotel owners)
Router.put('/edit-Hotel/:id',  editHotel);

// Get My Hotels (only for logged-in users)
Router.get("/get-my-Hotels", isAuth, getMyHotels);

module.exports = Router;
