const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");
const { passportAuth } = require("./config/jwt-middleware");


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());
passportAuth(passport);

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
