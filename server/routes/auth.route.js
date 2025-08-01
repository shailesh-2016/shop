const router = require("express").Router();
const authController = require("../controller/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logoutUser);
router.post("/google-login", authController.googleLogin);

router.get("/check-auth", authController.authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user: req.user,
  });
});

module.exports = router;
