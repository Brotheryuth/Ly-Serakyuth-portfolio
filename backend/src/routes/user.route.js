const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
router.get("/", userController.getAllInfo);
router.post('/', userController.createUser);
router.put("/:id", userController.updateUserInfo);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getByID);
module.exports = router;