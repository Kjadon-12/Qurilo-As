const express = require('express');
const { formSubmit } = require('../controller/form.controller');
const router = express.Router();
const upload = require('../middleware/multer.middleware')

router.post('/form' ,upload.fields([{ name: "allFiles" }]), formSubmit )


module.exports = router