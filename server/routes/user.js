const express = require("express");

const { isAdmin } = require("../middlewares/checkAdmin");
const userController = require("../controllers/user.js");

const router = express.Router();

router.post("/updateProfile", userController.updateProfile);
router.post("/updatePassword", userController.updatePassword);
router.post("/deleteAccount", userController.deleteAccount);
router.get('/me', userController.getUser);

router.get("/", isAdmin, userController.getUsers);

module.exports = router;
