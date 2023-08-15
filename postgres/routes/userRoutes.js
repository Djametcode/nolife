const express = require("express");
const { createContact, getCustomer } = require("../controller/userController");
const router = express.Router();

router.post("/create", createContact);
router.get("/customer", getCustomer);

module.exports = router;
