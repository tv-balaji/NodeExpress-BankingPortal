const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const accountData = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json"),
  "utf8"
);
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(
  path.join(__dirname, "json", "users.json"),
  "utf8"
);
const users = JSON.parse(userData);

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
  response.render("profile", { user: users[0] });
});

app.get("/transfer", function(request, response) {
  response.render("transfer");
});

app.post("/transfer", function(req, response) {
  accounts[req.body.from].balance =
    accounts[req.body.from].balance - req.body.amount;
  accounts[req.body.to].balance =
    parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, "json/accounts.json"),
    accountsJSON,
    "utf8"
  );
  response.render("transfer", { message: "Transfer Completed" });
});

app.get("/payment", function(request, response) {
  response.render("payment", { account: accounts.credit });
});

app.post("/payment", function(req, response) {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount, 10);
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf-8"
  );
  response.render("payment", {
    message: "Payment Successful",
    account: accounts.credit
  });
});

app.listen(3000, () => {
  console.log("PS Project running on port 3000");
});
