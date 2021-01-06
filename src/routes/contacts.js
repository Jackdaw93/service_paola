const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const contactsController = require("../controllers/contacts");

/** @swagger
 * /paola/v1/contact/add:
 *   post:
 *     description: Create a new Contact
 *     parameters:
 *      - name: name
 *        description: fullname
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phone
 *        description: 12345678
 *        in: formData
 *        required: true
 *        type: string
 *      - name: address
 *        description: jakarta
 *        in: formData
 *        required: true
 *        type: string
 *      - name: image
 *        description: profile.png
 *        in: formData
 *        required: true
 *        type: file
 *     responses:
 *       201:
 *         description: Created
 */
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

/**
 * @swagger
 * /paola/v1/contact/view/5ff53eaebfadff57005e0aec:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/view/:contactId", contactsController.getContactById);

/**
 * @swagger
 * /paola/v1/contact/views:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/views", contactsController.getAllContact);

/** @swagger
 * /paola/v1/contact/update/:contactId:
 *   put:
 *     description: Updated Contact
 *     parameters:
 *      - name: name
 *        description: fullname
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phone
 *        description: 12345678
 *        in: formData
 *        required: true
 *        type: string
 *      - name: address
 *        description: semarang
 *        in: formData
 *        required: true
 *        type: string
 *      - name: image
 *        description: profile.png
 *        in: formData
 *        required: true
 *        type: file
 *     responses:
 *       201:
 *         description: Updated
 */
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

/**
 * @swagger
 * /paola/v1/contact/delete/:contactId:
 *   delete:
 *     description: Delete Success
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.delete("/delete/:contactId", contactsController.deleteContact);

module.exports = router;
