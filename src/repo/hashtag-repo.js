const CrudRepository = require("./crud-repo");
const Hashtag = require("../models/hashtag");

class hastagRepository extends CrudRepository {
  constructor() {
    super(Hashtag);
  }
  async bulkCreate(data) {
    const tags = Hashtag.insertMany(data);
    return tags;
  }
  async findByTag(title) {
    const tag = await Hashtag.find({
      title: title,
    });

    return tag;
  }
  async findBytweetId(id) {
    const tag = await Hashtag.find({
      tweets: id,
    });
    return tag;
  }
}

module.exports = hastagRepository;
