const mongoose = require('mongoose');
const validator = require("validator");
const formSchema = new mongoose.Schema({
    firstName:{
           type: String,
           required: true
    }, 
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(
                  "Email is not in correct format"
                );  
              }
        }
    },
    dob:{
        type: Date,
        required: true
    },
    residentialAddress:{
        street1: {
            type: String,
            required: true
        },
        street2: {
            type: String,
            required: true
        }
    },
    permanentAddress:{
        street1: {
            type: String,
            default: ''
            
        },
        street2: {
            type: String,
            default: ''
            
        }
    },
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
module.exports = Form;