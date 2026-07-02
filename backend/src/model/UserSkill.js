const mongoose = require("mongoose");
const userSkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Skill name is required"],
    trim: true,
  },
  skillLevel: {
    type: Number,
    required: [true, "skill level is required"],
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    required: [true, "skill category is required "],
    enum: ["Frontend", "Backend", "Database", "Tools"],
  },
});
const userSkill = mongoose.model("UserSkill", userSkillSchema);
module.exports = userSkill;
