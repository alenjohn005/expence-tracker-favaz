const router = require("express").Router();
const Transaction = require("../Models/Transactions");

//Add Category
router.post("/add-transaction", async (req, res) => {
  try {
    const newTransaction = new Transaction({
      amount: req.body.amount,
      categoryId: req.body.categoryId,
      userId: req.body.userId,
      transactionType: req.body.transactionType,
    });
    const transaction = await newTransaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Category
router.get("/get-transaction", async (req, res) => {
  try {
    console.log(req.query);
    if (
      req.query.startDate !== "" &&
      req.query.endDate !== "" &&
      req.query.transactionType !== ""
    ) {
      console.log("data-----");
      const transaction = await Transaction.find({
        userId: req.query.userId,
        createdAt: {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        },
        transactionType: req.query.transactionType,
      });
      res.status(200).json(transaction);
    } else if (req.query.startDate && req.query.endDate) {
      const transactionWithoutType = await Transaction.find({
        userId: req.query.userId,
        createdAt: {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        },
      });
      res.status(200).json(transactionWithoutType);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Category
router.delete("/delete-category", async (req, res) => {
  try {
    const categories = await Category.deleteOne({ _id: req.body.categoryId });
    console.log(categories);
    res
      .status(200)
      .json({ status: true, message: "Category Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
