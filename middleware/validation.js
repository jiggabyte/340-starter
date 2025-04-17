const { body, validationResult } = require("express-validator");

// Validation rules for login
const loginRules = () => [
  body("account_email")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("account_password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

// Middleware to check validation results for login
const checkLoginData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("notice", "Login failed. Please check your inputs.");
    return res.status(400).render("account/login", {
      title: "Login",
      errors: errors.array(),
      account_email: req.body.account_email,
    });
  }
  next();
};

// Validation rules for registration
const registrationRules = () => [
  body("account_firstname").notEmpty().withMessage("First name is required."),
  body("account_lastname").notEmpty().withMessage("Last name is required."),
  body("account_email").isEmail().withMessage("A valid email is required."),
  body("account_password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),
];

// Middleware to check validation results for registration
const checkRegistrationData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array().map((err) => err.msg).join(" "));
    return res.redirect("/account/register");
  }
  next();
};

module.exports = { loginRules, checkLoginData, registrationRules, checkRegistrationData };