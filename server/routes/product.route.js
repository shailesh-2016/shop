const router = require('express').Router();
const upload = require('../middleware/upload'); // multer with Cloudinary
const productController = require('../controller/product.controller');
const { authMiddleware } = require('../controller/auth.controller');

router.post('/', upload.array('product_images', 5), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.array('product_images', 5), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
// 👇 Review Routes
// routes/productRoutes.js (ya jisme bhi tum ho)
router.post('/:id/review', productController.addReview);
router.get('/:id/review', productController.getReviews);     // ✅ Get reviews




module.exports = router;
