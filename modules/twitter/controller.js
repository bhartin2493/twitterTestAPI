const express = require("express");
const router = express.Router();

const { getTweets, getUsers } = require("./service");

router.get("/getTweets", async (req, res) => {
  const queryParams = req.query.search;
  const lang = req.query.lang;

  let tweetsData = await getTweets(queryParams, lang);

  // console.log("Tweets data:", tweetsData);

  return res.send(tweetsData);
});

router.get("/getUserTweets", async (req, res) => {
  const screen_name = req.query.screen_name;
  const count = req.query.count;
  let usersData = await getUsers(screen_name, count);
  return res.send(usersData);
});

module.exports = router;
