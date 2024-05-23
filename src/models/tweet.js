const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      max: [270, "Tweet cannot be more than 270 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);