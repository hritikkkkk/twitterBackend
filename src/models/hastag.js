const mongoose = require("mongoose");
const { Schema } = mongoose;

const hastagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Hastag", hastagSchema);
