const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const accountModel = require("../models/accountModel");
const utilities = require("../utilities/");

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav();
  const { account_email, account_password } = req.body;
  const accountData = await accountModel.getAccountByEmail(account_email);

  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.");
    return res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    });
  }

  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password;
      const accessToken = jwt.sign(accountData, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600 * 1000,
      });

      return res.redirect("/account/");
    } else {
      req.flash("notice", "Please check your credentials and try again.");
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Access Forbidden");
  }
}

/* ****************************************
 *  Build management view
 * ************************************ */
async function buildManagement(req, res) {
  const nav = await utilities.getNav();
  const accountData = res.locals.accountData;

  res.render("account/management", {
    title: "Account Management",
    nav,
    accountData,
  });
}

/* ****************************************
 *  Build update view
 * ************************************ */
async function buildUpdateView(req, res) {
  const nav = await utilities.getNav();
  const accountData = await accountModel.getAccountById(req.params.account_id);

  res.render("account/update", {
    title: "Update Account",
    nav,
    accountData,
  });
}

/* ****************************************
 *  Update account details
 * ************************************ */
async function updateAccount(req, res) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body;
  const result = await accountModel.updateAccount(account_id, account_firstname, account_lastname, account_email);

  if (result) {
    req.flash("message", "Account updated successfully.");
    res.redirect("/account");
  } else {
    req.flash("error", "Failed to update account.");
    res.redirect(`/account/update/${account_id}`);
  }
}

/* ****************************************
 *  Update account password
 * ************************************ */
async function updatePassword(req, res) {
  const { account_id, account_password } = req.body;
  const hashedPassword = await bcrypt.hash(account_password, 10);
  const result = await accountModel.updatePassword(account_id, hashedPassword);

  if (result) {
    req.flash("message", "Password updated successfully.");
    res.redirect("/account");
  } else {
    req.flash("error", "Failed to update password.");
    res.redirect(`/account/update/${account_id}`);
  }
}

module.exports = { accountLogin, buildManagement, buildUpdateView, updateAccount, updatePassword };