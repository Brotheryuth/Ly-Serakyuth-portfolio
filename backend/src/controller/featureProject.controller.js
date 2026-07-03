const featureProject = require('../model/featureProject');

/**
 * @brief get all feature project 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getAllProject = async (req, res)=>{
  try {
    const projects = await featureProject.find();
    if (!projects) {
      return res.status(400).json({ message: 'Failed to load data' });
    }
    res.status(200).json({message:'Load data successful' , project: projects})
  } catch (e) {
    res.status(500).json({message:e.message})
  }
}
/**
 * @brief feature project
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
 const createProject = async (req, res) => {
   const { projectName, projectDescription, developPeriod, projectUrl, ...optionalFields } = req.body;
   try {
     if (!projectName || !projectDescription || !developPeriod || !projectUrl) {
       return res.status(400).json({ message: "Project name, description, duration, and URL are required" });
     }
     const newProject = await featureProject.create({
       projectName,
       projectDescription,
       developPeriod,
       projectUrl,
       ...optionalFields
     });
     res.status(201).json({ message: "Project created successfully", project: newProject });
   } catch (e) {
     res.status(400).json({ message: e.message });
   }
 };
/**
 * @brief get project by its ID 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getProjectByID = async (req, res) => {
  const { id } = req.params;
  try {
    const PROJECT = await featureProject.findById(id);
    
    if (!PROJECT) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project found", project: PROJECT });
  } catch (e) {
    res.status(500).json({message:e.message})
  }
}

/**
 * @brief Update project by get id from paramter or header
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { _id, ...UPDATE_DATA } = req.body;
  try {
    const UPDATE_PROJECT = await featureProject.findByIdAndUpdate(id, UPDATE_DATA, { new: true, runValidators: true });
    if (!UPDATE_PROJECT) {
      return res.status(404).json({ message: 'Project to update not found' });
    }
    res.status(200).json({ message: "Project updated successful", project: UPDATE_PROJECT });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

/**
 * @brief delete project 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const DELETE_PROJECT = await featureProject.findByIdAndDelete(id);
    if (!DELETE_PROJECT) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Deleted successful', project: DELETE_PROJECT });
  } catch (e) {
    res.status(500).json({message:e.message})
  }
}

module.exports = { createProject, getAllProject, getProjectByID, updateProject, deleteProject };