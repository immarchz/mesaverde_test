const express = require("express");
const formRouter = require("../server/routes/form");
var cors = require("cors");
const connectDB = require("../server/utils/db");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
const port = 5050;

app.use("/api", formRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
