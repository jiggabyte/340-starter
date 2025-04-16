const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require("../middleware/validation");
const utilities = require("../utilities/");

// Protect the account management route
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;