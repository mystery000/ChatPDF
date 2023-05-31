const express = require("express");

const userController = require("../controllers/user.js");

const router = express.Router();

const Role = {
    Administrator: "admin",
    User: "user",
};

router.post("/updateProfile", userController.updateProfile);
router.post("/updatePassword", userController.updatePassword);
router.get('/me', userController.getUser);

router.get("/", userController.getUsers);

module.exports = router;
