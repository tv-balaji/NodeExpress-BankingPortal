const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const accountdata = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json"),
  "utf8"
);
const accounts = JSON.parse(accountdata);
const usersdata = fs.readFileSync(
  path.join(__dirname, "json", "users.json"),
  "utf8"
);
const users = JSON.parse(usersdata);

app.get("/", function(request, response) {
  response.render("index", { title: "Account Summary", accounts });
});

app.get("/savings", function(request, response) {
  response.render("account", { account: accounts.savings });
});

app.get("/checking", function(request, response) {
  response.render("account", { account: accounts.checking });
});

app.get("/credit", function(request, response) {
  response.render("account", { account: accounts.credit });
});

app.get("/profile", function(request, response) {
  response.render("profile", { user: user[0] });
});

app.listen(3000, () => {
  console.log("PS Project running on port 3000");
});
