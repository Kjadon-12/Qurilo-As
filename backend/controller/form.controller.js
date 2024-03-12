const sendApiError = (res, message, statusCode = 400) => {
  console.log(message);
  res.status(statusCode).json({ error: message });
};

const Form = require("../model/form.model");

const formSubmit = async (req, res) => {
  try {
    console.log(req)
    console.log(req.body);
    console.log(req.files);
    // console.log(req.headers)
    if (req?.body?.permanentAddress) {
      var permanentAddress = JSON.parse(req.body.permanentAddress);
    }
    const residentialAddress = JSON.parse(req.body.residentialAddress);
    var fileTypeMatch = true;
    // Validate file types in documents array
    req.body?.documents?.forEach((document, idx) => {
      const parsedDocument = JSON.parse(document.uploadedFile);
      if (
        !parsedDocument.actualFileType.split("/").includes(document.fileType)
      ) {
        fileTypeMatch = false;
        sendApiError(res, `File type not matched for document ${idx + 1}`);
        return;
      }
    });
    if (fileTypeMatch) {
      const formData = await Form.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: new Date(req.body.dob),
        residentialAddress: {
          street1: residentialAddress.street1,
          street2: residentialAddress.street2,
        },
        permanentAddress: {
          street1: permanentAddress.street1,
          street2: permanentAddress.street2,
        },
        // documents: req.body.documents.map((document) => ({
        //   uploadedFile: document.uploadedFile,
        //   fileName: document.fileName,
        //   fileType: document.fileType,
        // })),
      });

      console.log(formData);
      res.send("Successfully Submitted");
    }
  } catch (error) {
    sendApiError(res, error.message);
  }
};

module.exports = { formSubmit };
