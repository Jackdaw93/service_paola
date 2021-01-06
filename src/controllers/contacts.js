const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");

exports.createContact = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error("Invalid value");
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }
    if (!req.file) {
        const err = new Error("Image must be uploaded");
        err.errorStatus = 422;
        throw err;
    }

    const name = req.body.name;
    const image = req.file.path;
    const phone = req.body.phone;
    const address = req.body.address;

    const dataContact = new Contact({
        name: name,
        phoneNumber: phone,
        address: address,
        image: image,
    });

    dataContact
        .save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log("err: ", err);
        });
};
