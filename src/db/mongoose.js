const mongoose = require("mongoose")

async function dbConnection(){
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser:true,
        })
        console.log("connected to db...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection


