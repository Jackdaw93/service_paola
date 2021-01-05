const { validationresult, validationResult } = require("express-validator");

exports.createContact = (req, res, next) => {
    const name = req.body.name;
    //const image = req.body.image;
    const phone = req.body.phone;
    const address = req.body.address;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("Invalid Value");
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const result = {
        message: "Create Contact Success",
        data: {
            id: 1,
            name: "Rohmad",
            image: "image.png",
            phone: "123",
            address: "pluit",
        },
    };

    res.status(201).json(result);
};
