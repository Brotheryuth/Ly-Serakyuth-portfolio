const jwt = require('jsonwebtoken');
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const verifyAdmin = async (req, res, next)=>{
  const authHeader = req.headers.authorization;
  // invalid 
  if (!authHeader.startsWith("Bearer")) {
    return res.status(401).json({message:"Invalid or Expired JWT"})
  }
  //valid 
  const token = authHeader.replace("Bearer", ' ').trim();
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verifyToken;
    next();
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
}

module.exports = verifyAdmin;