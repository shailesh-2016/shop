const Wishlist = require("../model/wishlist");

// ➕ Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { _id } = req.body;

    const existing = await Wishlist.findOne({ _id });
    if (existing) {
      return res.status(200).json(existing); // already exists
    }

    const wishlistItem = new Wishlist(req.body);
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    console.error("❌ Wishlist Add Error:", err.message);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// 📥 Get all wishlist items
exports.getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("❌ Wishlist Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

// ❌ Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("❌ Wishlist Delete Error:", err.message);
    res.status(500).json({ message: "Failed to delete wishlist item" });
  }
};
