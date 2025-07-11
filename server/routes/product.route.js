const router = require('express').Router();
const upload = require('../middleware/upload'); // multer with Cloudinary
const productController = require('../controller/product.controller');

router.post('/', upload.array('product_images', 5), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.array('product_images', 5), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
