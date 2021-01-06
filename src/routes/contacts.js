const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const contactsController = require("../controllers/contacts");

router.post(
    "/add",
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

router.get("/views", contactsController.getAllContact);
router.get("/view/:contactId", contactsController.getContactById);
router.put(
    "/update/:contactId",
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
            .isLength({ min: 3 })
            .withMessage("input address doesn't not match"),
    ],
    contactsController.updateContact
);
router.delete("/delete/:contactId", contactsController.deleteContact);

module.exports = router;
