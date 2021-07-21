//Express Server
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const { client } = require("./db");

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

app.use("/api", require("./Routes"));

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
  client.connect();
});
