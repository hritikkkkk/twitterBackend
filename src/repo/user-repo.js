const CrudRepository = require("./crud-repo");
const User = require("../models/user");

class userRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async existingUser(username, email) {
    return await User.findOne().or([{ username }, { email }]);
  }
  async login(usernameOrEmail) {
    return await User.findOne().or([
      { username: usernameOrEmail },
      { email: usernameOrEmail },
    ]);
  }
}

module.exports = userRepository;
