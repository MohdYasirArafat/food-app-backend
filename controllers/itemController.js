import Item from "../models/ItemModel.js";

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items); // return 200 status
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch items" });
  }
};

// GET single item by ID
export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Create new item with uploaded image
export const createItem = async (req, res) => {
  try {
    const { name, price, desc, category, rating } = req.body;

    // Get image path if file uploaded
    const img = req.file ? `/uploads/${req.file.filename}` : "";
    

    const item = new Item({
      name,
      price,
      desc,
      category,
      rating,
      img,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create item" });
  }
};



// Update item
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to update item" });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
