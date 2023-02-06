const connection = require("../config/database");
const User = require("../models/user");

const getAllUsers = async () => {
  let [results, fields] = await connection.query("Select * from Users");
  return results;
};

const getUserById = async (userId) => {
  let id = userId.replace(/['"]+/g, "");
  let results = await User.findById(id).exec();
  let user = results;
  return user;
};

const updateUserById = async (email, name, city, userId) => {
  let results = await connection.query(
    `UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?`,
    [email, name, city, userId]
  );
};
const deleteUserById = async (userId) => {
  await User.deleteOne({ _id: userId });
  // let [results, fields] = await connection.query(
  //   `DELETE from Users WHERE id = ?`,
  //   [userId]
  // );
};
module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById };
