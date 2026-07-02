const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./src/config/db');
require('dotenv').config();

const server= express();
const PORT = process.env.PORT || 5000;

connectionDB();

server.use(cors()); 
server.use(express.json()); // be able to handle http request    

server.listen(PORT, () => {
    console.log(`Server running on  localhost:${PORT}`);
});