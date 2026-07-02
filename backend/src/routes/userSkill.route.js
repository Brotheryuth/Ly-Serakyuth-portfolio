const express = require('express')
const router = express.Router();
const userSkillController = require('../controller/userSkill.controller')
router.get('/', userSkillController.getAllSkill);
router.post('/', userSkillController.createSkill);
router.put("/:id", userSkillController.updateSkill);
router.delete("/:id", userSkillController.deleteSkill);
module.exports = router;