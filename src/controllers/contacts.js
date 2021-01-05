exports.createContact = (req, res, next) => {
    res.json({
        message: "Create Contact Success",
        data: {
            id: 1,
            name: "Sri Pandan",
            address: "pluit",
        },
    });
    next();
};

exports.getAllContact = (req, res, next) => {
    res.json({
        message: "Get All Contact Success",
        data: [
            {
                id: 1,
                name: "Sri Pandan",
                address: "Pluit",
            },
        ],
    });
};
