const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

router.post("/contact", contactsController.createContact);
router.get("/contacts", contactsController.getAllContact);

module.exports = router;
