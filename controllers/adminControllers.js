const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.status(200).json(users); // Return the users as JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" }); // Handle server errors
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL
    const user = await User.findByIdAndDelete(userId); // Delete the user by ID

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Handle case where user doesn't exist
    }

    res.status(200).json({ message: "User deleted successfully" }); // Return success message
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" }); // Handle server errors
  }
};
