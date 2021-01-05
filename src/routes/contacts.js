const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const contactsController = require("../controllers/contacts");

router.post(
    "/contact",
    [
        body("name")
            .isLength({ min: 2 })
            .withMessage("input name doesn't match"),
        body("phone")
            .isLength({ min: 8 })
            .withMessage("input phone less than 8")
            .isLength({ max: 13 })
            .withMessage("input phone more than 13")
            .isNumeric()
            .withMessage("input must number"),
        body("address")
            .isLength({ min: 5 })
            .withMessage("input address doesn't not match"),
    ],
    contactsController.createContact
);

module.exports = router;
