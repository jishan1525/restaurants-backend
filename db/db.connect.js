const mongoose = require("mongoose")
require("dotenv").config();

const mongoUrl = process.env.MONGODB;

function initializeDatabase() {
mongoose.connect(mongoUrl).then((()=>{
    console.log("Connected to Database")
})).catch((error)=>{
    console.log("Error connecting to database",error)
})
}

module.exports ={initializeDatabase}