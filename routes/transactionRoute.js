import express from "express";
import { getAllTransaction , addTransaction, editTransaction , deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();


router.get("/get", getAllTransaction);
router.post("/add", addTransaction);
router.put("/edit/:id", editTransaction);
router.delete("/delete/:id", deleteTransaction );







export default router ;