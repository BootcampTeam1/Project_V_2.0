// Dependencies ------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const db = require("./models");

// PORT and Express --------------------------------------------
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware --------------------------------------------------

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Express-Session
app.use(session({
   secret: "do or do not, there is no try",
   resave: true,
   saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Router -----------------------------------------------------
const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

app.use(htmlRoutes);
app.use(apiRoutes);

// Listener ---------------------------------------------------
db.sequelize.sync().then(() => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Connected on localhost:${PORT}`);
  });
});
