const express = require("express");

const app = express();
const contactRoutes = require("./src/routes/contacts");

app.use("/", contactRoutes);

app.listen(4000);
