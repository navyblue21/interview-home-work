const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const Counter = Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counter = model("counter", Counter);

module.exports = counter;
