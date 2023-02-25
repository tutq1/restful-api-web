const { Router } = require("express");
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

const {
  deleteArrayCustomer,
  postCreateCustomer,
  postCreateArrayCustomer,
  getAllCustomer,
  putUpdateCustomer,
  deleteACustomer,
} = require("../controllers/customerController");

const {
  postCreateProject,
  getAllProject,
  putUpdateProject,
  deleteAProject,
} = require("../controllers/projectController");

const {
  postCreateTask,
  getAllTask,
  putUpdateTask,
  deleteATask,
} = require("../controllers/taskController");

routesAPI.get("/users", getUsersAPI);

routesAPI.post("/users", postCreateUserAPI);

routesAPI.patch("/users", putUpdateUserAPI);

routesAPI.delete("/users", deleteUserAPI);

routesAPI.post("/file", postUploadSingleFileAPI);
routesAPI.post("/files", postUploadMultiFileAPI);

routesAPI.get("/info", (req, res) => {
  return res.status(200).json({
    data: req.query,
  });
});

routesAPI.get("/info/:name/:address", (req, res) => {
  return res.status(200).json({
    data: req.params,
  });
});

routesAPI.get("/customers", getAllCustomer);
routesAPI.put("/customers", putUpdateCustomer);
routesAPI.post("/customers", postCreateCustomer);
routesAPI.post("/customers-many", postCreateArrayCustomer);
routesAPI.delete("/customers-many", deleteArrayCustomer);
routesAPI.delete("/customers", deleteACustomer);

//project
routesAPI.post("/projects", postCreateProject);
routesAPI.get("/projects", getAllProject);
routesAPI.put("/projects", putUpdateProject);
routesAPI.delete("/projects", deleteAProject);

//task
routesAPI.post("/tasks", postCreateTask);
routesAPI.get("/tasks", getAllTask);
routesAPI.put("/tasks", putUpdateTask);
routesAPI.delete("/tasks", deleteATask);

module.exports = routesAPI;
