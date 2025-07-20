import express from "express" ;
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./database/db.js";
const PORT = process.env.PORT ;
import transactionRoutes from "./routes/transactionRoute.js"

dbConnection();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1", transactionRoutes);



app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});