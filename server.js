import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
const app = express();

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5000;
const database_url = process.env.DATABASE_URL;

// Middleware: CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://food-app-frontend-p46d.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB(database_url);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found", path: req.originalUrl });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
