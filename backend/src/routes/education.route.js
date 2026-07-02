const express = require('express');
const router = express.Router();
const educationController = require('../controller/Education.controller');

router.get('/', educationController.getAllEducation);
router.psot('/', educationController.createEducation);
router.put("/:id", educationController.updateEducation);
router.delete("/:id", educationController.deleteEducation);
module.exports = router;