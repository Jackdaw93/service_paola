const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Paola API's",
            description: "Paola API's Information",
            servers: ["http://localhost:4004"],
        },
    },
    apis: ["./src/routes/contacts.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
    "/paola/v1/contact/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs)
);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jgp" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const contactRoutes = require("./src/routes/contacts");

app.use("/paola/v1/contact", contactRoutes);
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        "mongodb+srv://admin:admin123@back-end-narasumber.ja48q.mongodb.net/contacts?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        app.listen(4004, () => console.log("Conected"));
    })
    .catch((err) => console.log(err));
