require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");
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
    //using mongoose
    await connection();

    //using mongodb driver
    // Connection URL
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);

    // // Database Name
    // const dbName = process.env.DB_NAME;

    // await client.connect();
    // console.log("Connected successfully to server");

    // const db = client.db(dbName);
    // const collection = db.collection("customers");

    // collection.insertOne({ name: "tqt" });

    //lenh chay server
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB", error);
  }
})();
