//Modules required
const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATA_BASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

//Start server on PORT assignment through config.env
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
