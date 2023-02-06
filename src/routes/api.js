const express = require("express");

const routesAPI = express.Router();

const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultiFileAPI,
} = require("../controllers/apiController");

routesAPI.get("/", (req, res) => {
  res.send("hello word");
});
const { postCreateCustomer } = require("../controllers/customerController");
routesAPI.get("/users", getUsersAPI);

routesAPI.post("/users", postCreateUserAPI);

routesAPI.patch("/users", putUpdateUserAPI);

routesAPI.delete("/users", deleteUserAPI);

routesAPI.post("/file", postUploadSingleFileAPI);
routesAPI.post("/files", postUploadMultiFileAPI);

routesAPI.post("/customers", postCreateCustomer);
module.exports = routesAPI;
