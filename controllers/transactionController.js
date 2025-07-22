import Transaction from "../model/transactionSchema.js";

const getAllTransaction = async (req, res) => {
  try {
    const allTransaction = await Transaction.find({});
    if (allTransaction && allTransaction.length > 0) {
      res.status(200).json({
        success: true,
        message: "All data fetched successfully",
        data: allTransaction
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No record found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, note } = req.body;

    const newTransaction = new Transaction({
      type,
      amount,
      category,
      note
    });
    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data: newTransaction
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const editTransaction = async (req, res)=>{
    try{
        const transactionId = req.params.id ;
        const newData  = req.body ;
         
        const updateTransaction = await Transaction.findByIdAndUpdate(transactionId , newData ,{new : true});
        if(!updateTransaction){
          res.status(400).json({
            success : false ,
            message : "transaction not updated"
          })
        }
        res.status(200).json({
          success : true ,
          message : "Transaction updated successfully ",
          data : updateTransaction
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const deleteTransaction =  async(req, res)=>{
  try{
    const transactionId = req.params.id ;
    const delTransaction = await Transaction.findByIdAndDelete(transactionId);
    if(!delTransaction){
      res.status(400).json({
        success : false ,
        message : "no record deleted "
      })
    }
    res.status(200).json({
      success : true ,
      message : "Transaction deleted successfully ",
      data : delTransaction
    })

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success : false ,
      message : "Something went  wrong "
    })
  }
}

export { getAllTransaction, addTransaction , editTransaction , deleteTransaction};
