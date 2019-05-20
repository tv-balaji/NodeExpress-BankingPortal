const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const { accounts, users, writeJSON } = require("./data");

const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.render("index", { title: "Account Summary", accounts });
});

app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

app.get("/profile", function(request, response) {
  response.render("profile", { user: users[0] });
});

app.listen(3000, () => {
  console.log("PS Project running on port 3000");
});
