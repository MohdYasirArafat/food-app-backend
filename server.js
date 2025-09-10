import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import router from "./routes/authRoutes.js"
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
const app = express();

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5000;
const database_url = process.env.DATABASE_URL;

// Middleware
const allowedOrigins = [
  "http://localhost:5173", 
  "https://food-app-frontend-p46d.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json());
// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
// Connect to DB
connectDB(database_url);
// app.use('/',router)
app.use('/api/auth', router);

// Routes
app.use("/api/orders", orderRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Item routes
app.use("/api/items", itemRoutes);

// Catch-all (optional)
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found", path: req.originalUrl });
});

// Start server
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
