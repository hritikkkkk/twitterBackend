const mongoose = require("mongoose");
const { Enums } = require("../utils/common");
const { TWEET, COMMENT } = Enums.LIKE_TYPE;
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: [TWITTER, COMMENT],
    },
    likeable: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", likeSchema);
