const {
  postCreateTaskService,
  getAllTaskService,
  putUpdataTaskService,
  deleteATaskService,
} = require("../services/taskService");

const postCreateTask = async (req, res) => {
  let result = await postCreateTaskService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const getAllTask = async (req, res) => {
  let result = await getAllTaskService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const putUpdateTask = async (req, res) => {
  let result = await putUpdataTaskService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteATask = async (req, res) => {
  let result = await deleteATaskService(req.id);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  postCreateTask,
  getAllTask,
  putUpdateTask,
  deleteATask,
};
