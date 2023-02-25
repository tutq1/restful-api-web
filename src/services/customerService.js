// goi den mongoose models
const Customer = require("../models/customer");
const aqp = require("api-query-params");
const { checkImageSingleFile } = require("../controllers/apiController");
const { uploadSingleFile } = require("../services/fileService");
const createCustomerService = async (customerData) => {
  try {
    // console.log("customerData", customerData);
    let result = await Customer.create(customerData);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    //console.log(">>>error: ", error);
    return null;
  }
};
const getAllCustomerService = async (queryString) => {
  try {
    const { filter, page, limit, sort, projection, population } =
      aqp(queryString);
    //offset vs skip la  1
    let offset = (page - 1) * limit;
    delete filter.page;
    let result = null;
    result = await Customer.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();
    return result;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
const checkValidateImg = async (req, res) => {
  let imageUrl = "";

  if (!req.files || Object.keys(req.files).length === 0) {
    return (imageUrl = "");
  } else if (checkImageSingleFile(req, res) === false) {
    return res.status(200).json({
      errorCode: -1,
      ErrorMessage: "Invalid file",
    });
  } else {
    let result = await uploadSingleFile(req.files.image);
    imageUrl = result.path;
  }
  return imageUrl;
  // if (checkImageSingleFile(req, res) === false) {
  //   return res.send("Invalid file");
  // }
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return (imageUrl = "");
  // } else {
  //   let result = await uploadSingleFile(req.files.image);
  //   imageUrl = result.path;
  // }
  // return imageUrl;
};
const putUpdateCustomerService = async (req, res) => {
  try {
    let imageUrl = await checkValidateImg(req, res);
    let { id, name, address, phone, description } = req.body;
    let results = await Customer.updateOne(
      { _id: id },
      {
        name: name,
        address: address,
        phone: phone,
        image: imageUrl,
        description: description,
      }
    );
    return results;
  } catch (error) {
    console.log(">>>Error: ", error);
    return null;
  }
};
const deleteACustomerService = async (id) => {
  try {
    //deleteById của Soft Delete với MongoDB
    let results = await Customer.deleteById(id);
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteArrayCustomerService = async (arrId) => {
  try {
    //xoa theo soft delete:
    let results = Customer.delete({ _id: arrId });

    //xoa khoi database
    //let results = Customer.deleteMany({ _id: { $in: arrId } });
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteArrayCustomerService,
};
