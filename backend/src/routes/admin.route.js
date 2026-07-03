const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const verifyAdmin = require('../middleware/auth.middleware');

router.get('/',verifyAdmin , adminController.getAllAdmin);
router.post('/', adminController.createAdmin);
router.get('/:id', verifyAdmin, adminController.getAdminByID);
module.exports = router;