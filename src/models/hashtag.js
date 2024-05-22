const mongoose = require("mongoose");
const { Schema } = mongoose;

const hashtagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hashtag", hashtagSchema);
