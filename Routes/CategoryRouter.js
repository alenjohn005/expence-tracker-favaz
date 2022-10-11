const router = require("express").Router();
const Category = require("../Models/Category");

//Add Category
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category({
      categoryName: req.body.categoryName,
      userId: req.body.userId,
    });
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Category
router.get("/get-category/:userId", async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.params.userId });
    res.status(200).json(categories);
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
