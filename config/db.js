const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.log("Could not connect DB", error.message);
        process.exit(1);
    }
};

module.exports=connectDB;