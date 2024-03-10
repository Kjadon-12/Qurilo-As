



const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./route/form.route");
const dbConnect = require("./dbConnect/dbConnect");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();

dbConnect();

app.use("/v1", router);
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT} port`);
});
