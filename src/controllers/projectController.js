const Project = require("../models/project");

const {
  postCreateProjectService,
  getProject,
  updateProjectService,
  deleteProjectService,
} = require("../services/productService");

const postCreateProject = async (req, res) => {
  //   let { name, startDate, endDate, description, customerInfor, leader } =
  //     req.body;
  //   let projectData = {
  //     name,
  //     startDate,
  //     endDate,
  //     description,
  //     customerInfor,
  //     leader,
  //   };
  let project = await postCreateProjectService(req.body);
  //   let project = await Project.create({
  //     name,
  //     startDate,
  //     endDate,
  //     description,
  //     customerInfor,
  //     leader,
  //   });
  //   console.log("project: ", project);
  return res.status(200).json({
    errorCode: 0,
    data: project,
  });
};

const getAllProject = async (req, res) => {
  let result = await getProject(req.query);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const putUpdateProject = async (req, res) => {
  let result = await updateProjectService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteAProject = async (req, res) => {
  console.log("req.body", req.body);
  let result = await deleteProjectService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  postCreateProject,
  getAllProject,
  putUpdateProject,
  deleteAProject,
};
