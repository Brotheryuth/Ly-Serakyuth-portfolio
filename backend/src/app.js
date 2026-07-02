const express         = require('express');
const app             = express();
const userRoute       = require('../src/routes/user.route');
const userSkillRoute  = require('../src/routes/userSkill.route');
const projectRoute    = require('../src/routes/featureProject.route');
const educationRoute = require('../src/routes/education.route')

app.use("api/user", userRoute);
app.use("api/userSkill", userSkillRoute);
app.use("api/project", projectRoute);
app.use("/api/education", educationRoute);

module.exports = app;