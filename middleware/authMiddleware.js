const jwtUtility = require("../utilities/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/login"); // Redirect to login if no token
  }

  const decoded = jwtUtility.verifyToken(token);
  if (!decoded) {
    res.clearCookie("jwt"); // Clear invalid token
    return res.redirect("/login");
  }

  req.user = decoded; // Attach user info to request
  next();
};

module.exports = authMiddleware;