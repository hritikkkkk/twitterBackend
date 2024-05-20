const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { ServerConfig } = require("./config");

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(ServerConfig.DB);
}
app.listen(ServerConfig.PORT, () => {
  console.log(`twitter Server is listening to the port ${ServerConfig.PORT}`);
});
