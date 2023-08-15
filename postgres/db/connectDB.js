const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Wedus123",
  port: 5432,
});

module.exports = db;
