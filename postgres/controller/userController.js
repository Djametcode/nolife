const db = require("../db/connectDB");

const createContact = async (req, res) => {
  try {
    const { nama, umur, hobby } = req.body;

    // const payload = `INSERT INTO customers VALUES (${name}, ${age}, ${hobby});`;

    const result = await db.query(
      `INSERT INTO learn (nama, umur, hobby) VALUES ('${nama}', ${umur}, '${hobby}')`
    );
    const data = result.rows;

    return res.status(200).json({ msg: "Success", data });
  } catch (error) {
    console.log(error);
  }
};

const getCustomer = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM learn;");
    const data = result.rows;

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createContact, getCustomer };
