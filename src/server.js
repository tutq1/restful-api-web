require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const fileUpload = require("express-fileupload");

const connection = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

//config template engine
configViewEngine(app);

// default options
// config file upload
app.use(fileUpload());

//dung route, khai bao route
app.use("/", webRoutes);

app.use("/v1/api/", apiRoutes);

(async () => {
  // test connection
  try {
    // ket noi db roi moi chay server
    await connection();
    //lenh chay server
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB", error);
  }
})();
