const express = require("express");
const twitter = require("../modules/twitter/controller.js");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/test", twitter);
};
