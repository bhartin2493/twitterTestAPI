const mongoose = require("mongoose");
const applicationConstant = require("../../constants/applicationConstant");

const twitterSchema = new mongoose.Schema(
  {
    created_at: String,
    id: String,
    text: String,
    username: String,
    user_description: String,
    retweet_count: Number,
  },
  { versionKey: false }
);

const twitterModel = mongoose.model(
  "Twitter",
  twitterSchema,
  applicationConstant.getKeywordSpecificTweets
);

const userTweetModel = mongoose.model(
  "UserTweets",
  twitterSchema,
  applicationConstant.getUserTweetsCollection
);

module.exports = {
  twitterModel,
  userTweetModel,
};
