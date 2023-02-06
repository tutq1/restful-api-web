const mongoose = require("mongoose");

//shape data
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //trường name la bat buoc
      required: true,
    },
    address: String,
    phone: String,
    image: String,
    description: String,
  },
  { timestamps: true } //tự động thêm các trường createdAt và updatedAt
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

// model -> doi tuong tuong trung cho du lieu ban muon luu
// muon query ket qua
