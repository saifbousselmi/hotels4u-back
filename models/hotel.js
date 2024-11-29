const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    photos: [{ type: String }],
    rating: { type: Number, default: 0 },
    documentUrl: { type: String },
    numberOfRooms: { type: Number },
    status: { type: String, default: "pending" },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);

