const { checkImageSingleFile } = require("./apiController");
const { createCustomerService } = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileService");

module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, image, description } = req.body;

    let imageUrl = "";

    if (checkImageSingleFile(req, res) === false) {
      return res.send("Invalid file");
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      // do nothing
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }

    let customerData = {
      name,
      address,
      phone,
      image,
      description,
      image: imageUrl,
    };
    let customer = await createCustomerService(customerData);

    return res.status(200).json({
      errorCode: 0,
      data: customer,
    });
  },
};
