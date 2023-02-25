const Joi = require("joi");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteArrayCustomerService,
} = require("../services/customerService");

const aqp = require("api-query-params");

const { uploadSingleFile } = require("../services/fileService");

const { checkImageSingleFile } = require("../controllers/apiController");
module.exports = {
  postCreateCustomer: async (req, res) => {
    //let { name, address, phone, email, description } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),

      address: Joi.string(),

      phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),

      email: Joi.string().email(),

      description: Joi.string(),
    });

    let imageUrl = "";
    //abortEarly=false thì hiển thị tất cả lỗi, true hiển thị lỗi đầu tiên
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(200).json({
        msg: error,
      });
    } else {
      if (checkImageSingleFile(req, res) === false) {
        res.status(400).send("The image file is not in the correct format.");
        return;
      }
      if (!req.files || Object.keys(req.files).length === 0) {
        // do nothing
      } else {
        let result = await uploadSingleFile(req.files.image);
        imageUrl = result.path;
      }
      let customerData = req.body;

      customerData.image = imageUrl;

      let customer = await createCustomerService(customerData);
      return res.status(200).json({
        errorCode: 0,
        data: customer,
      });
    }
  },
  postCreateArrayCustomer: async (req, res) => {
    let customer = await createArrayCustomerService(req.body.customers);
    if (customer) {
      return res.status(200).json({
        errorCode: 0,
        data: customer,
      });
    } else {
      return res.status(200).json({
        errorCode: -1,
        data: customer,
      });
    }
  },
  getAllCustomer: async (req, res) => {
    // const limit = req.query.limit;
    // const page = req.query.page;
    // let name = req.query.name;
    let results = null;

    results = await getAllCustomerService(req.query);
    // }else results = await getAllCustomerService();
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  },
  putUpdateCustomer: async (req, res) => {
    let results = await putUpdateCustomerService(req, res);

    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  },
  deleteACustomer: async (req, res) => {
    let id = req.body.id;

    let result = await deleteACustomerService(id);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },
  deleteArrayCustomer: async (req, res) => {
    let result = await deleteArrayCustomerService(req.body.id);
    if (result) {
      return res.status(200).json({
        errorCode: 0,
        data: result,
      });
    } else {
      return res.status(200).json({
        errorCode: -1,
        data: result,
      });
    }
  },
};
