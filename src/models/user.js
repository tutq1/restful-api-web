const mongoose = require("mongoose");
//shape data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;

// model -> doi tuong tuong trung cho du lieu ban muon luu
// muon query ket qua
