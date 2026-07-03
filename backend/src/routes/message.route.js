const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller');
const verifyAdmin = require('../middleware/auth.middleware');

router.get('/', verifyAdmin, messageController.getAllMessages);
router.post('/', messageController.createMessage);
module.exports = router;