const education = require("../model/Education");

/**
 * @brief create education background
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
 const createEducation = async (req, res) => {
   const { institution, level, startDate, endDate, ...optionalFields } = req.body;
   try {
     if (!institution || !level || !startDate || !endDate) {
       return res.status(400).json({ message: "Institution, level, start date, and end date are required" });
     }
     const newEducation = await education.create({
       institution,
       level,
       startDate,
       endDate,
       ...optionalFields 
     });
     res.status(201).json({ message: "Education record created successfully", education: newEducation });
   } catch (e) {
     res.status(400).json({ message: e.message });
   }
 };

/**
 * @brief get all education data from database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllEducation = async (req, res) => {
  try {
    const getEducation = await education.find();
    res.status(200).json({ message: "Load Successful", data: getEducation });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/**
 * @brief Update Education
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateEducation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedData = await education.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedData) {
      return res.status(404).json({ message: "Education to update not found" });
    }
    res.status(200).json({ message: "Updated Successful", data: updatedData });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
/**
 * @brief create education background
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await education.findByIdAndDelete(id);
    if (!deletedData) {
      return res
        .status(404)
        .json({ message: "Education to delete not found " });
    }
    res.status(200).json({ message: "Deleted Successful", data: deletedData });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
module.exports = {
  createEducation,
  getAllEducation,
  updateEducation,
  deleteEducation,
};
