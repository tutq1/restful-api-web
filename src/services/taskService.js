const Task = require("../models/task");
const aqp = require("api-query-params");
const postCreateTaskService = async (data) => {
  if (data.type === "EMPTY-TASK") {
    let newResult = await Task.create(data);
    return newResult;
  }
  return null;
  //
};
const getAllTaskService = async (data) => {
  let page = data.page;
  const { filter, limit } = aqp(data);
  let offset = (page - 1) * limit;
  delete filter.page;
  let result = null;
  result = await Task.find(filter).skip(offset).limit(limit).exec();
  return result;
};
const putUpdataTaskService = async (data) => {
  let result = await Task.updateOne({ _id: data.id }, { ...data });
  return result;
};
const deleteATaskService = async (id) => {
  try {
    let result = await Task.deletebyId(id);
    return result;
  } catch (error) {
    console.log("error delete task: ", error);
    return null;
  }
};
module.exports = {
  postCreateTaskService,
  getAllTaskService,
  putUpdataTaskService,
  deleteATaskService,
};
