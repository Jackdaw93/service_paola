const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const path = require("path");
const fs = require("fs");



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

exports.getAllContact = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    Contact.find()
        .countDocuments()
        .then((count) => {
            totalItems = count;
            return Contact.find()
                .skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then((result) => {
            res.status(200).json({
                message: "All Data",
                data: result,
                total_data: totalItems,
                per_page: parseInt(perPage),
                current_page: parseInt(currentPage),
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.getContactById = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findById(contactId).then((result) => {
        if (!result) {
            const error = new Error("Data not found");
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: "Data found",
            data: result,
        });
    });
};

exports.updateContact = (req, res, next) => {
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

    const contactId = req.params.contactId;

    Contact.findById(contactId)
        .then((contact) => {
            if (!contact) {
                const err = new Error("Data not found");
                err.errorStatus = 404;
                throw err;
            }

            contact.name = name;
            contact.phone = phone;
            contact.address = address;
            contact.image = image;

            return contact.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "Update Success",
                data: result,
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.deleteContact = (req, res, next) => {
    const contactId = req.params.contactId;

    Contact.findById(contactId)
        .then((contact) => {
            if (!contact) {
                const error = new Error("Data not found");
                error.errorStatus = 404;
                throw error;
            }

            removeImage(contact.image);
            return Contact.findByIdAndDelete(contactId);
        })
        .then((result) => {
            res.status(200).json({
                message: "Deleted Success",
                data: result,
            });
        })
        .catch((err) => {
            next(err);
        });
};

const removeImage = (filePath) => {
    filePath = path.join(__dirname, "../..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
