const mongoose= require("mongoose");

const expenseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Expense = mongoose.model("Expense",expenseSchema);
module.exports=Expense;