const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  HOTEN: mongoose.Schema.Types.String,
  DIACHI: mongoose.Schema.Types.String,
  PHONE: mongoose.Schema.Types.Number,
  PHAI:mongoose.Schema.Types.String,
  EMAIL:mongoose.Schema.Types.String,
  ANH:mongoose.Schema.Types.String,
  NGHENGHIEP: mongoose.Schema.Types.String,
  CHONSANPHAM: mongoose.Schema.Types.String,
  SONGUOIDUTHAMGIA: mongoose.Schema.Types.String, 
});
const register = mongoose.model("Register", userSchema);
module.exports = register;
