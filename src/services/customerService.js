// goi den mongoose models
const customer = require("../models/customer");

const createCustomerService = async (customerData) => {
  try {
    let result = await customer.create(customerData);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createCustomerService,
};
