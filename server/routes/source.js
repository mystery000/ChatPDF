const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
// const emptyFolderMiddleware = require('../middlewares/emptyFolder');
const upload_max_count = 10;
const sourceController = require('../controllers/source');

router.post(
    '/addSource',
    sourceController.addSource,
);
router.post('/uploadFile', upload, sourceController.uploadFile);
router.post('/deleteFile', sourceController.deleteFile);
router.get('/', sourceController.getSources);
router.put('/:sourceId', sourceController.renameSource);
router.get('/documents', sourceController.getAllDocuments);
router.get('/documents/:sourceId', sourceController.getDocumentsFromSource);
router.post('/:sourceId/chat', sourceController.chat);
router.get('/:sourceId/messages', sourceController.getMessagesFromSource);
router.delete('/:sourceId/messages', sourceController.deleteAllMessage);
router.delete('/:sourceId', sourceController.deleteSource);

module.exports = router;
