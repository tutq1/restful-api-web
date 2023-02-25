const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
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
    email: String,
    image: String,
    description: String,
  },

  {
    timestamps: true,
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, "i") });
      },
    },
  } //tự động thêm các trường createdAt và updatedAt
);
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

// model -> doi tuong tuong trung cho du lieu ban muon luu
// muon query ket qua
