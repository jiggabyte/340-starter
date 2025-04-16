const { body, validationResult } = require("express-validator");

const regValidate = {
  // Validation rules for login
  loginRules: () => [
    body("account_email")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("account_password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ],

  // Middleware to check validation results
  checkLoginData: (req, res, next) => {
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
  },
};

module.exports = regValidate;