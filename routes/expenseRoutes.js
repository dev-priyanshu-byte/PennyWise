const express=require("express");
const router=express.Router();
const {getExpenses,createExpense,getExpense,updateExpense, deleteExpense, getExpenseByRange} = require("../controllers/expenseController");
const auth=require("../middlewares/authMiddleware");

 //router.get("/",auth,getExpenses);
router.get("/:id",auth,getExpense);
router.post("/",auth,createExpense);
router.put("/:id",auth,updateExpense);
router.delete("/:id",auth,deleteExpense);
router.get("/",auth,getExpenseByRange);
module.exports=router;

