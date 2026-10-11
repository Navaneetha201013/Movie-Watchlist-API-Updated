const mongoose = require("mongoose");
const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase Connected Successfully...")
    }
    catch(err){
        console.log("DataBase Connection Failed...")
        throw err
    }
}
module.exports = connectDB