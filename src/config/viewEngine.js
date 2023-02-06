const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
  //config template engine
  // doan code duoi dung khi server.js nam trong thu muc src
  app.set("views", path.join("./src", "views"));
  //app.set("views", "./src/views");

  app.set("view engine", "ejs");

  //config static file: image/css/js
  app.use(express.static(path.join("./src", "public")));
};

//export configViewEngine
module.exports = configViewEngine;
