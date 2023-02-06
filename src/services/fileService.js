const path = require("path");
const uploadSingleFile = async (fileObject) => {
  let [name, typeFile] = fileObject.name.split(".");
  let uploadPath = path.resolve(__dirname, "../public/images/upload");
  let finalName = `${name}-${Date.now()}.${typeFile}`;
  let finalPath = `${uploadPath}/${finalName}`;

  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    console.log(">>>Check error: ", error);
    return {
      status: "failed",
      path: null, // link anh
      error: JSON.stringify(error), //convert obj err sang string
    };
  }
};

const uploadMultiplefiles = async (fileArr) => {
  console.log("fileArr.name: ", fileArr);
  let resultArr = [];
  let countSuccess = 0;
  try {
    for (let i = 0; i < fileArr.length; i++) {
      let [name, typeFile] = fileArr[i].name.split(".");
      let finalName = `${name}-${Date.now()}.${typeFile}`;
      nameImage = finalName;
      let uploadPath =
        "./src/public/images/upload/" +
        name +
        "-" +
        Date.now() +
        "." +
        typeFile;
      try {
        await fileArr[i].mv(uploadPath);
        resultArr.push({
          status: "success",
          path: finalName,
          filename: fileArr[i].name,
          error: null,
        });
        countSuccess++;
      } catch (error) {
        resultArr.push({
          status: "failed",
          path: null,
          filename: fileArr[i].name,
          error: JSON.stringify(error),
        });
      }
    }
    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(">>>Check error: ", error);
    return {
      status: "failed",
      path: null, // link anh
      error: JSON.stringify(error), //convert obj err sang string
    };
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultiplefiles,
};
