const Post = require("../../Blog-Backend/models/Post");
const Expense= require("../models/Expense");
const { post } = require("../routes/expenseRoutes");

const getExpenses=async(req,res)=>{
    try {
        const userId=res.user;
        const expenses=await Expense.find();
        if(!expenses){
            return res.status(404).json({message:"No expenses found"});
        }
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const getExpense=async(req,res)=>{
    const {id}=req.params;
    try {
        const expense= await Expense.findById(id);
        if(!expense)
        {
            return res.status(404).json({message:"Expense not found"});
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const createExpense=async(req,res)=>{
    const user=req.user;
    const {name,amount}=req.body;
    if(!name||!amount)
    {
        return res.status(400).json({message:"Name and Amount of expense is required"});
    }
    const expense=new Expense({name,amount,creator:user});
    await expense.save();
    res.status(200).json(expense);
}
const updateExpense=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,amount}=req.body;
        if(!name||!amount)
        {
            return res.status(400).json({message:"Name and Amount is required"});
        }
        var expense= await Expense.findById(id);
        if(!expense)
        {
            return res.status(404).json({message:"Expense not found"});
        }
        expense.name=name;
        expense.amount=amount;
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const deleteExpense=async(req,res)=>{
    try {
        const {id}= req.params;
        const expense=await Expense.findById(id);
        if(!expense)
        {
            return res.status(404).json({message:"Expense not found"});
        }
        await expense.deleteOne();
        res.status(200).json({message:"Expense deleted"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
module.exports={getExpenses,createExpense,getExpense,updateExpense,deleteExpense};