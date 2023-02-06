const express = require("express");
const {
  getHomePage,
  getTQT,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
} = require("../controllers/homeController");
const routes = express.Router();

//khai báo route
//routes.method('/route', handler);
routes.get("/", getHomePage);

routes.get("/TQT", getTQT);

routes.get("/create", getCreatePage);

routes.get("/update/:id", getUpdatePage);

routes.post("/create-user", postCreateUser);

routes.post("/update-user", postUpdateUser);

routes.post("/delete-user/:id", postDeleteUser);
routes.post("/delete-user", postHandleRemoveUser);
module.exports = routes;
