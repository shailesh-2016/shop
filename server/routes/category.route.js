const router = require("express").Router();
const {
  createCat,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controller/category.controller");
const upload = require("../middleware/upload");

router.post("/", upload.single("cat_image"), createCat);

router.get("/", getAllCategories);

router.delete("/:id", deleteCategory);

router.put("/:id", upload.single("cat_image"), updateCategory);

module.exports = router;