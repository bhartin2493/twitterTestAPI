// server.js

//Required Modules

const express = require("express");
const path = require("path");

//Port details

const app = express();
require("./startup/routes.js")(app);
require("./startup/db.js")();
const port = process.env.port || 3000;

//Server activation

app.listen(port, () => {
  console.log(`Integration server running on http://localhost:${port}`);
});
