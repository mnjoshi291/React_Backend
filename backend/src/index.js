const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config")

mongoose
  .connect(config.mongoose.url, {
    useCreateIndex: config.mongoose.options.useCreateIndex,
    useNewUrlParser: config.mongoose.options.useNewUrlParser,
    useUnifiedTopology: config.mongoose.options.useUnifiedTopology,
  })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server connected to the port ${config.port}...`);
    });
  })
  .catch((error) => {
    console.log("Somethig went wrong..", error);
  });
