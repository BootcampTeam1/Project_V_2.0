// Dependencies -------------------------------------------------
const path = require("path");
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes --------------------------------------------------------

// GET "/" - If the user already has an account send them to the members page
router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

// GET "/login" - If the user already has an account send them to the members page
router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../views/signin.html"));
});

// GET "/members" - authenticated route - logged in users only
// add this middleware for any route that shouldnt be accessible to public
router.get("/members", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/members/category", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/category.html"));
});

module.exports = router;
