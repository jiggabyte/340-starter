const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require("../middleware/validation");
const utilities = require("../utilities/");
const authMiddleware = require("../middleware/authMiddleware"); // Import authMiddleware

// Protect the account management route
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

// Render login view
router.get("/login", (req, res) => {
  res.render("account/login", {
    title: "Login",
    nav: res.locals.nav,
  });
});

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(), // Validation rules for login
  regValidate.checkLoginData, // Middleware to validate login data
  utilities.handleErrors(accountController.accountLogin) // Controller to handle login
);

// Render registration view
router.get("/register", (req, res) => {
  res.render("account/register", {
    title: "Register",
    nav: res.locals.nav,
  });
});

// Process the registration request
router.post(
  "/register",
  regValidate.registrationRules(), // Validation rules for registration
  regValidate.checkRegistrationData, // Middleware to validate registration data
  utilities.handleErrors(accountController.accountRegister) // Controller to handle registration
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