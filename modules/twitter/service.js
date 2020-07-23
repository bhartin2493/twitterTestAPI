const TwitterApi = require("twitter");
const config = require("../../config");
const { twitterModel, userTweetModel } = require("./twitter-model.js");
// const applicationConstant = require('../../constants/applicationConstant')

let T = new TwitterApi({
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret,
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
});

//getting tweets with specific keywords
//API consumes set of keywords and language
async function getTweets(q, lang) {
  let params = {
    q: q,
    lang: lang,
  };

  const output = await new Promise((resolve, reject) => {
    T.get("search/tweets", params, function (err, data, response) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
  let tweetDetails = [];
  output["statuses"].forEach((element) => {
    tweetDetails.map((item) => {
      if (element.id !== item.id) return "They re same";
    });
    let outputObj = {};

    outputObj.created_at = element.created_at;
    outputObj.id = element.id;
    outputObj.text = element.text;
    outputObj.username = element.user.screen_name;
    outputObj.user_description = element.user.description;
    outputObj.retweet_count = element.retweet_count;
    tweetDetails.push(outputObj);
  });

  //   let twitterObj = new twitterModel();
  await twitterModel.insertMany(tweetDetails);
  return tweetDetails;
}

//for getting user specific tweets
// API consumes screen_name(username) and count(no.of tweets)

async function getUsers(screen_name, count) {
  let params = {
    screen_name: screen_name,
    count: count,
  };
  const tweetData = await new Promise((resolve, reject) => {
    T.get("statuses/user_timeline", params, function (err, data, response) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });

  let usertweets = [];
  tweetData.forEach((element) => {
    let outputObj = {};

    outputObj.created_at = element.created_at;
    outputObj.id = element.id;
    outputObj.text = element.text;
    outputObj.username = element.user.screen_name;
    outputObj.user_description = element.user.description;
    outputObj.retweet_count = element.retweet_count;
    usertweets.push(outputObj);
  });

  await userTweetModel.insertMany(usertweets);
  return usertweets;
}

exports.getTweets = getTweets;
exports.getUsers = getUsers;
