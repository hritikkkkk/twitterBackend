const CrudRepository = require("./crud-repo");
const Like = require("../models/like");

class likeRepository extends CrudRepository {
  constructor() {
    super(Like);
    }
    async findLikedUser(data) {
        const like = await Like.findOne(data);
        return like;
    }
}

module.exports = likeRepository;
