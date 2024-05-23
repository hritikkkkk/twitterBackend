const mongoose = require("mongoose");
const { Enums } = require("../utils/common");
const { TWEET, COMMENT } = Enums.LIKE_TYPE;
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    onModel: {
      type: String,
      required: true,
      enum: [TWEET, COMMENT],
    },
    commentable: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
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

module.exports = mongoose.model("Comment", commentSchema);
