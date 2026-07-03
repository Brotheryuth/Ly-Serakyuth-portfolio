const express = require("express");
const router = express.Router();
const educationController = require("../controller/education.controller");

router.get("/", educationController.getAllEducation);
router.post("/", educationController.createEducation);
router.put("/:id", educationController.updateEducation);
router.delete("/:id", educationController.deleteEducation);
module.exports = router;
