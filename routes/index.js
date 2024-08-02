const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");
const db = require("../db/queries");
function getCurrentFormattedDate() {
  return DateTime.now().toLocaleString(DateTime.DATETIME_MED);
}

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: getCurrentFormattedDate(),
  },
  {
    id: 2,
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

  const newMessage = {
    id: messages.length + 1,
    text: message,
    user: user,
    added: getCurrentFormattedDate(),
  };
  messages.push(newMessage);
  res.redirect("/");
});

router.get("/message/:id", (req, res) => {
  const messageId = Number(req.params.id);

  const message = messages.find((message) => messageId === message.id);

  console.log(messageId, message);
  if (message) {
    res.render("messageDetail", { message });
  } else {
    res.status(404).send("Message not found");
  }
});

module.exports = router;
