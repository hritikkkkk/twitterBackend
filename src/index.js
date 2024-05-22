const express = require("express");
const mongoose = require("mongoose");
const app = express();
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`twitter Server is listening to the port ${ServerConfig.PORT}`);
});
