const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: Number,
    role: {
      type: String,
      enum: ["admin", "owner", "customer"],
      default: "customer" // Default to "customer" if not specified
    }
  },
  { timestamps: true },
  { collection: "users" }
);

module.exports = User = mongoose.model("User", userSchema);
