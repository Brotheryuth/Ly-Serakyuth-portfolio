const userSkill = require('../model/UserSkill')

/**
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 */
const getAllSkill = async (req, res) => {
  try {
    const getAll = await userSkill.find();
    res.status(200).json({ message: 'Load successful', skill:getAll});
  } catch (e) {
    res.status(400).json({message:e.message})
  }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const createSkill = async (req, res) => {
  const skillData = req.body;
  try {
    const newSkill = await userSkill.create(skillData);
    if (!newSKill) {
      return res.status(400).json({ message: 'Cannot create skill' });
    }
    res.status(201).json({ message: "Skill created successful", skill: newSkill });
  } catch (e) {
    res.status(400).json({message:e.message})
  }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { _id, ...updateinfo } = req.body;
  try {
    const newInfo = await userSkill.findByIdAndUpdate(id, updateinfo, { new: true, runValidators: true });
    
    if (!newInfo) {
      return res.status(404).json({message:'Skill not found'})
    }
    
    res.status(200).json({ message: 'Update successful', skill: newInfo });
    
  } catch (e) {
    res.status(400).json({message:e.message})
  }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteSkill = async (req, res)=>{
  const { id } = req.params;
  try {
    const deletedskill = await userSkill.findByIdAndDelete(id);
    if (!deletedskill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ message: 'Skill deleted successful', deleteSkill: deletedskill });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
module.exports = {
  getAllSkill,updateSkill, deleteSkill , createSkill
}