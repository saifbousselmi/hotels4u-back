const express = require("express");
const { test, register, login } = require("../controllers/authControllers");
const { registerValidation, validator } = require("../middlewares/validator");
const isAuth = require("../middlewares/isAuth");


const Router = express.Router();

Router.get("/test", test);

Router.post("/register", registerValidation(), validator, register);

Router.post("/login", login)

Router.get("/current", isAuth, (req, res) => {
    res.send(req.user)
})


module.exports = Router;




