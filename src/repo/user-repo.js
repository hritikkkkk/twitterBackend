const CrudRepository = require("./crud-repo");
const User = require("../models/user");

class userRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }
}

module.exports = userRepository;
