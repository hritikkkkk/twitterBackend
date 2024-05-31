const CrudRepository = require("./crud-repo");
const Comment = require("../models/comment");

class commentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
  async find(id) {
    const tweet = await Comment.findById(id).populate([
      { path: "likes" },
      { path: "comments" },
    ]);
    return tweet;
  }
}

module.exports = commentRepository;
