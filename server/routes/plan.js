const express = require("express");
const planController = require("../controllers/plan");
const router = express.Router();

router.get('/', planController.getAll);
router.get('/getUserSubscription', planController.getUserSubscription);
router.post('/createSubscription', planController.createSubscription);

module.exports = router;
