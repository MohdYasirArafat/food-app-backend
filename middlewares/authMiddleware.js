import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // extract token after "Bearer "
    if (!process.env.JWT_KEY) {
      return res.status(500).json({ msg: "JWT secret not set in backend" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(403).json({ msg: "Token is invalid or malformed" });
  }
};

export default authMiddleware;

