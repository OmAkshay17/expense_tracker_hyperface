const express = require("express");
const { request } = require("http");
const mongoose = require("mongoose");
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

mongoose.connect(
    "mongodb+srv://omakshay15:test123456@cluster0.cyhh0iz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
db.once("open", () => {
    console.log("Connected to MongoDB");
});


const expenseSchema = new mongoose.Schema({
    types: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true }
});

const Expense = mongoose.model("Expense", expenseSchema);


app.get("/getdata", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Error" });
    }
});

app.post("/postdata", async (req, res) => {
    const { types, amount, category } = req.body;

    try {
        if (!types || !amount || !category) {
            return res
                .status(400)
                .json({ message: "types and amount" });
        }

        const newExpense = new Expense({ types, amount, category });
        await newExpense.save();
        res.json(newExpense);
    } catch (error) {
        console.error("Error saving expense:", error);
        res.status(500).json({ message: "Error" });
    }
});

app.put("/updatedata", async (req, res) => {
    try {
        const { newamount ,category} = req.body;

        const expenses = await Expense.updateOne({ amount: newamount});
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Error" });
    }
});

app.delete("/deletedata", async (req, res) => {
    try {
        const { _id } = req.body
        const expenses = await Expense.deleteOne({ _id });
        res.json(expenses);

    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});