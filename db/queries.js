const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(message) {
  await pool.query("INSERT INTO messages (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};
