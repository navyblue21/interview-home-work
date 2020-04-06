const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://localhost/interview-zigvy", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch(error => {
    console.error(error);
  });

const db = mongoose.connection;

module.exports = db;
