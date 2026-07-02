const express         = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
app.use(express.json()); // be able to handle http request 

const userRoute       = require('../src/routes/user.route');
const userSkillRoute  = require('../src/routes/userSkill.route');
const projectRoute    = require('../src/routes/featureProject.route');
const educationRoute = require('../src/routes/education.route')
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
app.get('/', (req, res) => {
  res.send("Welcome to my portfolio")
})
app.use("/api/user", userRoute);
app.use("/api/userSkill", userSkillRoute);
app.use("/api/project", projectRoute);
app.use("/api/education", educationRoute);

module.exports = app;