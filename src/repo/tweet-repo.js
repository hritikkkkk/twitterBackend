const CrudRepository = require("./crud-repo");
const Tweet = require("../models/tweet");

class tweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }
}

module.exports = tweetRepository;
