// // backend/routes/authRoutes.js
// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const router = express.Router();

// // ===== Signup =====
// router.post("/reg", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "user" // default is user
//     });

//     await user.save();

//     res.json({ msg: "Signup successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // ===== Login =====
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: "Password does not match" });

//     // Create JWT token with role included
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_KEY || "secretkey",
//       { expiresIn: "1h" }
//     );

//     // Send role in response
//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Promote a user to admin
// router.post("/promote/:email", async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     user.role = "admin";
//     await user.save();

//     res.json({ msg: `${user.name} is now an admin`, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });


// export default router;

import express from "express"
import auth from "../controllers/authController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";


const router=express.Router()

router.post('/signup',auth.signup)
router.post('/login',auth.login)
// Protected route
router.get("/userDetails", authMiddleware, (req, res) => {
  res.json(req.user); // user info comes from middleware
});


export default router