const express = require("express");
const planController = require("../controllers/plan");
const router = express.Router();

router.get('/', planController.getAll);

module.exports = router;
