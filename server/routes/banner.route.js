const router = require("express").Router();
const upload = require("../middleware/upload"); // multer config for cloudinary/local
const bannerController = require("../controller/banner.controller");

// ✅ CRUD routes
router.post("/", upload.single("bannerImage"), bannerController.createBanner);
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);
router.put("/:id", upload.single("image"), bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
