const admin = require('../model/admin');
/**
 * create admin data
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createAdmin = async (req, res) => {
  const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: 'All Field are required' });
    }
  try {
    const newAdmin = await admin.create({
      email, name, password
    });
    res.status(201).json({ message: 'Create successful', admin: newAdmin });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

/**
 * get all data 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllAdmin = async (req, res) => {
  try {
    const admins = await admin.find();
    res.status(200).json({message:"load successful", data:admins})
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

/**
 * create admin by id 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAdminByID = async (req, res) => {
  const { id } = req.params;
  try {
    const adminData = await admin.findById(id);
    if (!adminData) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin found", admin: adminData });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
module.exports = { createAdmin, getAllAdmin, getAdminByID };