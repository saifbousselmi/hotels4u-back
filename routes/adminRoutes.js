const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminControllers");
const {isAdmin } = require("../middlewares/Role");
const isAuth = require("../middlewares/isAuth");

const Router = express.Router();

// Admin route to get all users (only admins)
Router.get("/users", isAuth, isAdmin, getAllUsers);

// Admin route to delete user by ID (only admins)
Router.delete("/delete-user/:id", isAuth, isAdmin, deleteUser);

module.exports = Router;
