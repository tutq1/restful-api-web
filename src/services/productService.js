const Project = require("../models/project");
const User = require("../models/user");
const aqp = require("api-query-params");

const Task = require("../models/task");

const getProject = async (data) => {
  let page = data.page;
  const { filter, limit, sort, projection, population } = aqp(data);
  //offset vs skip la  1
  let offset = (page - 1) * limit;
  delete filter.page;
  let result = await Project.find(filter)
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population)
    .exec();
  return result;
};

const updateProjectService = async (data) => {
  try {
    const projectId = data.projectId;
    // let {
    //   type,
    //   projectId,
    //   name,
    //   startDate,
    //   endDate,
    //   description,
    //   customerInfor,
    //   leader,
    // } = data;
    if (type === "EMPTY-PROJECT") {
      let result = await Project.updateOne({ _id: projectId }, { ...data });
      return result;
    }
    if (type === "UPDATE-USERS") {
      //let myProject = await Project.findById(data.projectId).exec();
      let myUser = await User.find({});

      let arrhandle = [];
      for (let item of data.userArr) {
        if (checkIdUser(item, myUser)) {
          arrhandle.push(item);
          // kiem tra id truyen len de updata co trong User collection ko ?
          // neu co ? updapte:return;
          // let arrhandle = data.userArr.filter((item, index) => {
          //   return data.userArr.indexOf(item) === index;
          // });
        }
      }
      if (arrhandle.length > 0) {
        let result = await Project.updateOne(
          { _id: projectId },
          { usersInfor: [...new Set(arrhandle)] }
        );
        return result;
      }
    }
    // console.log("data: ", data);
  } catch (error) {
    console.log(">>>Error: ", error);
    return null;
  }
};

const deleteProjectService = async (data) => {
  try {
    //deleteById của Soft Delete với MongoDB
    let results = await Project.deleteById(data.projectId);
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postCreateProjectService = async (data) => {
  try {
     
      if (data.type === "EMPTY-PROJECT") {
        let result = await Project.create(data);
        return result;
      }
      if (data.type === "ADD-USERS") {
        console.log("myProject", myProject);
        let myUser = await User.find({});
        // kiem tra userId goi len co ton tai trong collection User ko ?
        //data.userArr: danh sach userId truyen len de add vao usersInfor trong Project
        for (let item of data.userArr) {
          if (checkIdUser(item, myUser)) {
            checkIdForProject(item, myProject);
          }
        }
        let newResult = await myProject.save();
        return newResult;
      }
      if (data.type === "REMOVE-USERS") {
        // for (let i = 0; i < data.userArr.length; i++) {
        //   myProject.usersInfor.pull(data.userArr[i]);
        // }
        myProject.usersInfor = myProject.usersInfor.filter((item) => {
          return !data.userArr.includes(item.toString());
        });
        //myProject.markModified("usersInfor");
        let newResult = await myProject.save();
        return newResult;
      }
      if (data.type === "ADD-TASKS") {
        // console.log("data.projectId:", data.projectId);

        let myTask = await Task.find({});
        // kiem tra taskId gui len co ton tai trong collection Task ko ?
        //data.taskArr: danh sach taskId truyen len de add vao tasks trong Project

        for (let item of data.taskArr) {
          if (checkIdUser(item, myTask)) {
            console.log("item taskarr:", item);
            checkIdForProject(item, myProject);
          }
        }
        let newResult = await myProject.save();
        return newResult;
      }
  } catch (error) {
    console.log("error Project: ", error);
    return null;
  }
};
//kiem tra xem idUser truyen len co ton tai trong collection User ko ?
const checkIdUser = (userId, arrUser) => {
  let listIdUser1 = listIdUser(arrUser);
  if (listIdUser1.includes(userId)) return true;
  return false;
};
//ham lay danh sach idUser trong collection User:
const listIdUser = (arrUser) => {
  const userId = [];
  arrUser.forEach((item) => {
    userId.push(item._id.toString());
  });
  return userId;
};
//check userID or taskId đã tồn tại trong dự án chưa rồi mới push:
const checkIdForProject = (item, myProject) => {
  if (!myProject.usersInfor.includes(item)) {
    myProject.usersInfor.push(item);
  } else return;
};

//
// const checkIdForProject2 = async (data, myProject) => {
//   // let result = await Project.updateOne(
//   //   { _id: projectId },
//   //   { usersInfor: data.userArr }
//   // );
//   // return result;
//   data.userArr.forEach((element) => {
//     if (!myProject.usersInfor.includes(element)) {
//       myProject.usersInfor.push(element);
//     }
//   });
// };

module.exports = {
  postCreateProjectService,
  getProject,
  updateProjectService,
  deleteProjectService,
};
