const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
  res.send("Test Auth OK!");
};

// Register
exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password, phone, role } = req.body;

    // Validate that firstName and lastName are different
    if (firstName === lastName) {
      return res.status(400).send({ errors: [{ msg: "First name and last name must be different" }] });
    }

    // Check if the role is provided, default to 'customer' if not
    if (!role) {
      role = 'customer'; // Default role if not provided
    } else if (!["admin", "owner", "customer"].includes(role)) {
      return res.status(400).send({ errors: [{ msg: "Invalid role. Allowed roles are 'admin', 'owner', or 'customer'." }] });
    }

    // Check if email already exists
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ errors: [{ msg: "Email already used" }] });
    }

    // Check if phone number is already used
    if (phone) {
      foundUser = await User.findOne({ phone });
      if (foundUser) {
        return res.status(400).send({ errors: [{ msg: "Phone number already used" }] });
      }
    }

    // Create new user with the provided role
    let newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role // Set the role dynamically based on the input
    });

    // Hash the password before saving
    const salt = 10;
    let hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_KEY
    );

    // Return success message and the new user with token
    res.status(200).send({
      success: [{ msg: "Registered successfully!" }],
      newUser,
      token
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: [{ msg: "Cannot register" }] });
  }
};



// Login
exports.login = async (req, res) => {
  try {
    let { email, phone, password } = req.body;

    // Initialize a variable to hold the found user
    let foundUser;

    // Check if the login is using email or phone
    if (email) {
      // If email is provided, search by email
      foundUser = await User.findOne({ email });
    } else if (phone) {
      // If phone is provided, search by phone
      foundUser = await User.findOne({ phone });
    } else {
      return res.status(400).send({ errors: [{ msg: "Please provide email or phone number" }] });
    }

    // If no user is found, return an error
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "No user found with this email or phone number" }] });
    }

    // Check if the provided password matches the hashed password
    let isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return res.status(401).send({ errors: [{ msg: "Incorrect password" }] });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY
    );

    // Send success response with user details and token
    res.status(200).send({
      success: [{ msg: `Hello ${foundUser.firstName}, Welcome back!` }],
      foundUser,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: [{ msg: "Cannot login" }] });
  }
};

