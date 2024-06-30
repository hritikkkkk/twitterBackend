const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      max: [270, "Tweet cannot be more than 270 characters"],
    },
    images: {
      type: Array,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

tweetSchema.pre("findOneAndDelete", async function (next) {
  try {
    const tweetId = this.getQuery()._id; // Get the ID of the tweet being deleted
    const Hashtag = mongoose.model("Hashtag");
    // Remove this tweet's ID from the tweets array in all related hashtags
    await Hashtag.updateMany(
      { tweets: tweetId },
      { $pull: { tweets: tweetId } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

tweetSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const tweetId = this.getQuery()._id;
    const Hashtag = mongoose.model("Hashtag");

    await Hashtag.updateMany(
      { tweets: tweetId },
      { $pull: { tweets: tweetId } }
    );

    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Tweet", tweetSchema);
