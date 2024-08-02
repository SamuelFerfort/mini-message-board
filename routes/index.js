const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");
const db = require("../db/queries");

function formatMessage(message) {
  return {
    ...message,
    added: DateTime.fromJSDate(message.added).toLocaleString(DateTime.DATETIME_MED)
  };
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  const messages = await db.getAllMessages();
  const formattedMessages = messages.map(formatMessage);

  res.render("index", { title: "Mini Message Board", messages: formattedMessages });
});

router.get("/new", function (req, res) {
  res.render("form");
});

router.post("/new", async function (req, res) {
  const { message, user } = req.body;
  try {
    await db.insertMessage(user, message);
    res.redirect("/");
  } catch (err) {
    res.status(500).redirect("/");
    console.error("Error inserting message:", err);
  }
});

router.get("/message/:id", async (req, res) => {
  const messageId = Number(req.params.id);

  try {
    const message = await db.findMessageById(messageId);
    if (message) {
      const formattedMessage = formatMessage(message);
      res.render("messageDetail", { message: formattedMessage });
    } else {
      res.status(404).render("error", { message: "Message not found" });
    }
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).render("error", { message: "Internal server error" });
  }
});

module.exports = router;