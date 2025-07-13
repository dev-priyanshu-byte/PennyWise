const Post = require("../../Blog-Backend/models/Post");
const Expense= require("../models/Expense");
const getDateRange=require("../utils/getDateRange");

const getExpenses=async(req,res)=>{
    try {
        const creator=req.user.id;
        const expenses=await Expense.find({creator});
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
        if(expense.creator!=req.user.id){
            return res.status(400).json({message:"Unauthorized"});
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const createExpense=async(req,res)=>{
    const user=req.user.id;
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
        if(expense.creator!=req.user.id){
            return res.status(400).json({message:"Unauthorized"});
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
        if(expense.creator!=req.user.id){
            return res.status(400).json({message:"Unauthorized"});
        }
        await expense.deleteOne();
        res.status(200).json({message:"Expense deleted"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const getExpenseByRange = async (req, res) => {
  const { type, date } = req.query;

  if (!type || !["day", "week", "month"].includes(type)) {
    return getExpenses(req, res); 
  }

  const selectedDate = date ? new Date(date) : new Date();
  const { start, end } = getDateRange(type, selectedDate);

  try {
    const expenses = await Expense.find({
      creator: req.user.id, 
      createdAt: { $gte: start, $lte: end }
    });

    res.status(200).json({
      count: expenses.length,
      from: start,
      to: end,
      expenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports={getExpenses,createExpense,getExpense,updateExpense,deleteExpense,getExpenseByRange};