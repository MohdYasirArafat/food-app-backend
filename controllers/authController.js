import User from "../models/UserModel.js";

import jwt from "jsonwebtoken";

class auth {
  static signup = async (req, res) => {
    try {
      let { name, email, password, adminSecret } = req.body;

      // Check if user already exists
      let userdata = await User.findOne({ email: email });
      if (userdata) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Decide userType
      let userType = "User"; // default
      if (adminSecret && adminSecret === process.env.ADMIN_SECRET_KEY) {
        userType = "Admin";
      }

      // Create new user
      const newuser = new User({
        name,
        email,
        password, // ⚠️ should hash this before save
        userType,
      });

      await newuser.save();

      // Generate JWT
      let token = jwt.sign(
        { id: newuser._id, role: userType },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.status(201).json({
        msg: "Signup successful",
        token: token,
        user: {
          id: newuser._id,
          name: newuser.name,
          email: newuser.email,
          userType: newuser.userType,
        },
      });
    } catch (err) {
      console.log("Signup error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  };

  static login = async (req, res) => {
    let { email, password } = req.body;
    try {
      let userdata = await User.findOne({ email: email });
      if (!userdata) return res.status(404).json({ msg: "email not found" });

      let isMatch = await userdata.matchPassword(password);
      if (!isMatch) return res.status(404).json({ msg: "password not match" });

      let token = jwt.sign({ id: userdata._id }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });

      // Don't send password back to frontend
      let userResponse = {
        id: userdata._id,
        name: userdata.name,
        email: userdata.email,
        userType: userdata.userType,
      };

      res.status(200).json({
        msg: "user login successful",
        token: token,
        user: userResponse,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  };
}

export default auth;
