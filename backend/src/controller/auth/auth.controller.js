const admin = require("../../model/admin");
const jwt = require('jsonwebtoken');
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  try {
    const adminUser = await admin.findOne({ email });
    // if cannot find user with the email 
    if (!adminUser) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await adminUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    // generate JWT token 
    const token = jwt.sign({ id: adminUser._id, name: adminUser.name, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "Login Successful", token: token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {login}