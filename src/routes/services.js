const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../data");

router.get("/transfer", function(request, response) {
  response.render("transfer");
});

router.post("/transfer", function(req, response) {
  accounts[req.body.from].balance =
    accounts[req.body.from].balance - req.body.amount;
  accounts[req.body.to].balance =
    parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
  writeJSON();
  response.render("transfer", { message: "Transfer Completed" });
});

router.get("/payment", function(request, response) {
  response.render("payment", { account: accounts.credit });
});

router.post("/payment", function(req, response) {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount, 10);
  writeJSON();
  response.render("payment", {
    message: "Payment Successful",
    account: accounts.credit
  });
});

module.exports = router;