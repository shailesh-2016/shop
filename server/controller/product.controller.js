const Product = require('../model/product.model');


exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      materials,
      sizes,
      ratings,
      numReviews,
      stock,
      warranty,
      shippingInfo,
      returnPolicy,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      images,
      materials,
      sizes,
      ratings,
      numReviews,
      stock,
      warranty,
      shippingInfo,
      returnPolicy,
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, product: createdProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid product data', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


