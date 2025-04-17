const jwtUtility = require("../utilities/jwt");

const authMiddleware = {
  checkAdminOrEmployee: (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      req.flash("message", "Please log in.");
      return res.redirect("/account/login");
    }

    const decoded = jwtUtility.verifyToken(token);
    if (!decoded || (decoded.account_type !== "Employee" && decoded.account_type !== "Admin")) {
      req.flash("message", "You do not have permission to access this area.");
      return res.redirect("/account/login");
    }

    req.user = decoded;
    next();
  },
};

module.exports = authMiddleware;