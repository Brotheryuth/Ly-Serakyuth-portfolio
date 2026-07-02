const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./src/config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectionDB();

app.use(cors());
app.use(express.json()); // be able to handle http request    

app.listen(PORT, () => {
    console.log(`Server running on  localhost:${PORT}`);
});