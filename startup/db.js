const mongoose = require("mongoose");
const config = require("../config");

module.exports = async function () {
  const db = config["DB_URL"];
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}`))
    .catch((error) => console.log(`Error occured : ${error}`));
};
