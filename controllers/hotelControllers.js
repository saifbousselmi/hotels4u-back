const Hotel = require("../models/hotel");

// Test Route
exports.test = (req, res) => {
    res.send("Test OK!");
};

// Add Hotel (only for owners and admins)
exports.addHotel = async (req, res) => {
    try {
        const { name, location, region, description, pricePerNight, numberOfRooms, photos, phone, email } = req.body;

        // Check if all fields are present
        if (!name || !location || !region || !description || !pricePerNight || !numberOfRooms || !photos || !phone || !email) {
            return res.status(400).json({ msg: 'All fields are required.' });
        }

        // Assuming you have a hotel model to save the new hotel
        const newHotel = new Hotel({
            name,
            location,
            region,
            description,
            pricePerNight,
            numberOfRooms,
            photos,
            phone,
            email
        });

        // Save the new hotel to the database
        const savedHotel = await newHotel.save();
        
        // Return a success response
        res.status(201).send({ msg: "Hotel added successfully", savedHotel });
    } catch (error) {
        res.status(500).send({ msg: "Error adding hotel", error: error.message });
    }
};

// Get All Hotels (any user can view)
exports.getHotels = async (req, res) => {
    try {
        const foundHotels = await Hotel.find();
        res.status(200).send({ msg: "All Hotels: ", foundHotels });
    } catch (error) {
        res.status(500).send({ msg: "Error fetching hotels", error: error.message });
    }
};

// Get a Single Hotel by ID (any user can view)
exports.getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundHotel = await Hotel.findById(id);

        if (!foundHotel) {
            return res.status(404).send({ msg: "Hotel not found" });
        }

        res.status(200).send({ msg: "Hotel found: ", foundHotel });
    } catch (error) {
        res.status(500).send({ msg: "Error fetching hotel", error: error.message });
    }
};

// Delete Hotel
exports.deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);

        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        // Admins can delete any hotel, owners can only delete their own
            await Hotel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Hotel deleted successfully' });
  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit Hotel
exports.editHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);

        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        // Admins can edit any hotel, owners can only edit their own
            const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json(updatedHotel);

            
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get My Hotels (only for logged-in users)
exports.getMyHotels = async (req, res) => {
    try {
        const foundMyHotels = await Hotel.find({ addedBy: req.user._id });
        res.status(200).send({ msg: "My Hotels: ", foundMyHotels });
    } catch (error) {
        res.status(500).send({ msg: "Error fetching my hotels", error: error.message });
    }
};
