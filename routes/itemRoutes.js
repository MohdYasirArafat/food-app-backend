import express from "express";
import multer from "multer";
import { getItems,getItem, createItem, updateItem, deleteItem } from "../controllers/itemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, getItem);

router.post("/", authMiddleware, upload.single("img"), createItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);


export default router;

