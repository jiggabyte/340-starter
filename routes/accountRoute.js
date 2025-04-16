const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require("../middleware/validation");
const utilities = require("../utilities/");
const authMiddleware = require("../middleware/authMiddleware"); // Import authMiddleware

// Protect the account management route
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Update account routes
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdateView));
router.post("/update", utilities.handleErrors(accountController.updateAccount));
router.post("/update-password", utilities.handleErrors(accountController.updatePassword));

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  req.flash("message", "You have been logged out.");
  res.redirect("/");
});

// Protected route
router.get("/protected", authMiddleware.checkAdminOrEmployee, (req, res) => {
  res.send(`Welcome, ${req.user.email}`);
});

module.exports = router;