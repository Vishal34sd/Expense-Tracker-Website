import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type : {
        type : String ,
        enum : ["income", "expense"],
        required : true ,
        trim : true
    },
    amount : {
        type : Number ,
        required : true ,
    },
    category : {
        type : String ,
        required : true
    },
    note : {
        type: String ,
        default : " "
    },
    date : {
        type : Date,
        default : Date.now
    }
},{timestamp : true})

const transactionModel = mongoose.model("Transaction", transactionSchema);
export default transactionModel ;