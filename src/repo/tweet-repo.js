const CrudRepository = require("./crud-repo");
const Tweet = require("../models/tweet");

class tweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }
  async find(id) {
    const tweet = Tweet.findById(id).populate({ path: "likes" });
    return tweet;
  }
  async getWithComments(id) {
    const tweet = await Tweet.findById(id).populate({ path: "comments" });
    return tweet;
  }
}

module.exports = tweetRepository;
