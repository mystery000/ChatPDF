const express = require('express');
const router = express.Router();

const documentController = require('../controllers/document');

router.delete('/:id', documentController.delete);
router.put('/:id', documentController.update);

module.exports = router;
