const mongoose = require('mongoose');
const connectionDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`Mongo connection successfully ${conn.connection.port}`);
    }catch(e){
        console.error(`Connection failed ${e.message}`);
        process.exit(1); // shut down the server 
    }
}
module.exports = { connectionDB };