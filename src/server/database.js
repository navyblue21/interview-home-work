const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/interview-zigvy", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch(error => {
    console.error(error);
  });

const db = mongoose.connection;

module.exports = db;
