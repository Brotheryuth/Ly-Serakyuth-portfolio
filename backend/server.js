const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./src/config/db');
require('dotenv').config();
const app = require('./src/app');
const server= express();
const PORT = process.env.PORT || 5000;

connectionDB();

   

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
});