const express = require("express");
const jwtUtility = require("../utilities/jwt");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Replace with actual authentication logic
  if (email === "test@example.com" && password === "password123") {
    const token = jwtUtility.createToken({ email, role: "user" });
    res.cookie("jwt", token, { httpOnly: true, secure: true }); // Secure cookie
    return res.redirect("/"); // Redirect to home
  }

  res.status(401).send("Invalid credentials");
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
});

module.exports = router;