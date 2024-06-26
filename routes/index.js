const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");

function getCurrentFormattedDate() {
  return DateTime.now().toLocaleString(DateTime.DATETIME_MED);
}

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: getCurrentFormattedDate(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: getCurrentFormattedDate(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

router.get("/new", function (req, res) {
  res.render("form");
});

router.post("/new", function (req, res) {
  const { message, user } = req.body;

  if (!message || !user) return;
  console.log(message, user);
  const newMessage = {
    text: message,
    user: user,
    added: getCurrentFormattedDate(),
  };
  messages.push(newMessage);
  res.redirect("/");
});

module.exports = router;
