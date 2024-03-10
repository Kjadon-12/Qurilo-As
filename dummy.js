const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
// const router = require("./route/form-route");
// const dbConnect = require("./dbConnect/dbConnect");
const bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
const mongoose = require('mongoose');
const validator = require("validator");



app.use(cors());
dotenv.config();

//dbConnect

const dbConnect = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL)
      console.log("db connected")
  }
  catch (err) {
      console.log(Error ${err.message})
   }
  };

  dbConnect();



  //Schema
  const formSchema = new mongoose.Schema({
   
    documents:[
        {
            uploadedFile: {
                type: String, 
                required: true
            },
            fileName: {
                type: String,
                required: true
            },
            fileType: {
                type: String,
                enum: ['image', 'pdf'],
                required: true
            }
        }
    ]
}, {
    timestamps: true,

})

const Form = mongoose.model('Form', formSchema);



app.use(
  bodyParser.json({
      limit: "500mb",
  })
);

app.use(
  bodyParser.urlencoded({
      limit: "500mb",
      extended: true,
  })
);

app.use(upload.array());
app.post("/v1/form", async(req, res) => {
  console.log(\nform-data ->> ${JSON.stringify(req.body)});
  const formData = await Form.create({
    
    documents: req.body.documents.map((document) => ({
      uploadedFile: document.uploadedFile,
      fileName: document.fileName,
      fileType: document.fileType,
    })),
  });

  res.status(201).json({
    status: "success",
    data: "data transferred",
  });
});

app.listen(process.env.PORT, () => {
  console.log(listening on ${process.env.PORT} port);
});