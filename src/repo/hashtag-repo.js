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
}

module.exports = hastagRepository;
