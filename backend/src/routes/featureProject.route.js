const express = require('express');
const router = express.Router();
const projectController = require('../controller/featureProject.controller');
router.get('/', projectController.getAllProject);
router.post('/', projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
module.exports = router;