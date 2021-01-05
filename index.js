const express = require("express");

const app = express();
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: false }));

const contactRoutes = require("./src/routes/contacts");

app.use("/paola/v1", contactRoutes);
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(4000);
