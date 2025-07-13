const dotenv=require('dotenv');
const express=require('express');
const connectDB= require("./config/db.js");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes= require("./routes/userRoutes");

const app=express();

dotenv.config();
connectDB();


app.use(express.json());

app.use('/expense',expenseRoutes);
app.use('/user',userRoutes);

const PORT=process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log("Server running");
});