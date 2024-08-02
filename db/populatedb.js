#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv/config");
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO messages (message, username) 
VALUES
  ('Hi There' ,'Bryan'),
  ('Hello World' ,'Odin'),
  ('Yo','Damon');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
