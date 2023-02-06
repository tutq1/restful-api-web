const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDService");

const User = require("../models/user");

const getHomePage = async (req, res) => {
  let results = await User.find({});

  return res.render("homePage.ejs", { listUsers: results });
};

const getTQT = (req, res) => {
  res.render("sample.ejs");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  let id = req.params.id;
  // let user = await getUserById(id);
  let user = await User.findById(id).exec();
  res.render("edit.ejs", { userEdit: user });
  //res.render("edit.ejs");
};
const postUpdateUser = async (req, res) => {
  let { userId, email, name, city } = req.body;

  await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  res.redirect("/");
  // console.log(">>>rs:", results);

  // res.send("Update user succedd");
};

const postDeleteUser = async (req, res) => {
  let userId = req.params.id;
  //let user = await getUserById(userId);
  //await User.findById(id).exec();
  let user = await User.findById(userId).exec();
  res.render("delete.ejs", { userEdit: user });
};
const postHandleRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  //await deleteUserById(userId);
  await User.deleteOne({ _id: userId });
  res.redirect("/");
  //console.log(">>>ket qua: ", userId);
  //let id = Number(userId);
  //console.log(">>>kq: ", typeof id);
};
const postCreateUser = async (req, res) => {
  // let email = req.body.email;
  // let name = req.body.name;
  // let city = req.body.city;
  // Destructuring

  let { email, name, city } = req.body;

  await User.create({ email: email, name: name, city: city });
  res.redirect("/");
  //res.send("Create user succedd");
  // connection.query(
  //   `INSERT INTO Users (email, name , city )
  //   VALUES (?, ?, ?)`,
  //   [email, name, city],
  //   function (err, results) {
  //     console.log(results);
  //     res.send("Create user succedd");
  //   }
  // );
  // let [results, fields] = await connection.query(
  //   `INSERT INTO Users (email, name , city ) VALUES (?, ?, ?)`,
  //   [email, name, city]
  // );

  // connection.query("SELECT * FROM Users ", function (err, results, fields) {
  //   console.log(">>>result= ", results); // results contains rows returned by server
  // });
  //const [result, fields] = await connection.query("SELECT * FROM Users ");
};

module.exports = {
  getHomePage,
  getTQT,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
