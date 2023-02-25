const User = require("../models/user");

const {
  uploadSingleFile,
  uploadMultiplefiles,
} = require("../services/fileService");

const path = require("path");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  // Destructuring
  let { email, name, city } = req.body;
  let user = await User.create({ email: email, name: name, city: city });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { id, email, name, city } = req.body;

  let user = await User.updateOne(
    { _id: id },
    { email: email, name: name, city: city }
  );
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.id;
  console.log(">>>userid: ", req.body);
  let rs = await User.deleteOne({ _id: id });

  return res.status(200).json({
    errorCode: 0,
    data: rs,
  });
};
// check duoi image:
const checkImg = (req, res) => {
  const image = req.files.image;
  let check = false;
  const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
  let size = Object.keys(image).length;
  console.log("size: ", size);
  if (size === 1) {
    let [name, typeFile] = image.name.split(".");
    if (array_of_allowed_files.includes(typeFile)) return true;
  } else {
    for (let i = 0; i < size; i++) {
      let [name, typeFile] = image[i].name.split(".");
      if (array_of_allowed_files.includes(typeFile)) {
        check = true;
      } else {
        check = false;
        return check;
      }
    }
    return check;
  }
  return false;
};
// kiem tra duoi image single file
const checkImageSingleFile = (req, res) => {
  //neu req.files == null thi ko lam gi ca
  if (!req.files) {
    return;
  } else {
    const image = req.files.image;
    const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
    let [name, typeFile] = image.name.split(".");
    if (array_of_allowed_files.includes(typeFile)) return true;
    return false;
  }
};
// kiem tra duoi image multi file
const checkImageMultiFile = (req, res) => {
  if (!req.files) {
    return;
  } else {
    const image = req.files.image;
    let check = false;
    const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
    let size = image.length;
    for (let i = 0; i < size; i++) {
      let [name, typeFile] = image[i].name.split(".");
      if (array_of_allowed_files.includes(typeFile)) {
        check = true;
      } else {
        check = false;
        return check;
      }
    }
    return check;
  }
};
const postUploadSingleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  // check duoi image:
  // console.log(checkImg(req, res));
  if (checkImageSingleFile(req, res) === false) {
    return res.send("Invalid file");
  }
  // upload singlefile -> files is an obj

  let result = await uploadSingleFile(req.files.image);
  console.log(">>>check result: ", result);
  return res.send("ok single");
};
const postUploadMultiFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // upload multifile -> files is an array
  if (Array.isArray(req.files.image)) {
    if (checkImageMultiFile(req, res) === false) {
      return res.send("Invalid file");
    }
    let result = await uploadMultiplefiles(req.files.image);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else {
    return await postUploadSingleFileAPI(req, res);
  }
};
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultiFileAPI,
  checkImageSingleFile,
  checkImageMultiFile,
};
