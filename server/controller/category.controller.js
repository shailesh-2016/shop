const categoryModel = require("../model/category.model");

exports.createCat = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { cat_name } = req.body;
    const cat_image = req.file?.path;

    if (!cat_name || !cat_image) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const category = await categoryModel.create({ cat_name, cat_image });

    res
      .status(201)
      .json({ success: true, message: "Category created", data: category });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Get Categories Error:", err);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await categoryModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// controller/category.controller.js
// controller/category.controller.js

exports.updateCategory = async (req, res) => {
  try {
    const { cat_name } = req.body;

    // ✅ Prepare update data
    const updateData = { cat_name };

    // ✅ Check if file exists (new image uploaded)
    if (req.file && req.file.path) {
      updateData.cat_image = req.file.path;
    }

    // ✅ Find and update the document
    const updatedCat = await categoryModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCat) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCat,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


