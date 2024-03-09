import React ,{useState} from "react";
import UploadDocument from "../UploadDocument";

const Form = () => {
    const [documentRows, setDocumentRows] = useState([0, 1]); // Initialize with two rows
    const [ageWarn , setAgeWarn] = useState(false)
    const [isPermanentSameAsResidential, setIsPermanentSameAsResidential] = useState(false);
    const [formData , setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      dob:'',
      residentialAddress: {
        street1: '',
        street2: '',
      },
      permanentAddress: {
        street1: '',
        street2: '',
      },
      documents: [{
       uploadedFile: null
      }]

    })

  const addDocumentRow = () => {
    setDocumentRows([...documentRows, documentRows.length]);
  };

  const deleteDocumentRow = (index) => {
    if(documentRows?.length===2){
      console.log('can not delete document')
      return;
    }
    const updatedRows = documentRows.filter((rowIndex) => rowIndex !== index);
    setDocumentRows(updatedRows);
  };

// Function to handle changes in text inputs
const handleInputChange = (event, field, subfield = null) => {
  const value = subfield ? { ...formData[field], [subfield]: event.target.value } : event.target.value;
  setFormData({ ...formData, [field]: value });
};

// Function to handle file uploads
const handleFileChange = (file, index) => {
  const updatedDocuments = [...formData.documents];
  updatedDocuments[index] = { ...updatedDocuments[index], uploadedFile: file };
  setFormData({ ...formData, documents: updatedDocuments });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission with formData
    event.preventDefault();

  // Check if the age is at least 18 years
  const currentDate = new Date();
  const dobDate = new Date(formData.dob);
  // console.log(dobDate)
  const age = currentDate.getFullYear() - dobDate.getFullYear();
// console.log(age)
  if (age < 18 || dobDate == 'Invalid Date') {
    // Display an error message or handle it as per your requirements
    setAgeWarn(true)
    console.log("Age should be at least 18 years");
    setFormData({
      ...formData,
      dob: '',  
    });
    return;
  }
  else{
    console.log("submitted")
  }

  // Add logic to handle form submission with formData
  console.log(formData);
    
  };
  return (
    <>
      <div className="form container-form mt-5 p-3">
        <form onSubmit={handleSubmit}>
          <div className="row mb-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>First Name <span className="req-star">*</span></label>
              <br />
              <input
                type="text"
                className="text-input"
                placeholder="Enter your first name here..."
                required
                onChange={(e) => handleInputChange(e, "firstName")}
              ></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>Last Name <span className="req-star">*</span></label>
              <br />
              <input
                type="text"
                className="text-input"
                placeholder="Enter your last name here..."
                required='true'
                onChange={(e) => handleInputChange(e, "lastName")}
              ></input>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>E-mail <span className="req-star">*</span></label>
              <br />
              <input
                type="email"
                className="text-input"
                placeholder="ex:myname@example.com"
                required
                onChange={(e) => handleInputChange(e, "email")}
              ></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>Date of Birth <span className="req-star">*</span></label>
              <br />
              <input
                type="date"
                className="text-input"
                placeholder="Enter your last name here..."
                required
                
                onChange={(e) => handleInputChange(e, "dob")}
              ></input>
              <div className={ageWarn ? 'req-star' : ''}>(Min. age should be 18 years)</div>
            </div>
          </div>
          <div className="row mb-4">
            <label className="mb-2">Residential Address</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 1 <span className="req-star">*</span></label>
              <br />
              <input type="text" className="text-input" required onChange={(e) => handleInputChange(e, "residentialAddress", "street1")}></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 2 <span className="req-star">*</span></label>
              <br />
              <input type="text" className="text-input" required onChange={(e) => handleInputChange(e, "residentialAddress", "street2")}></input>
            </div>
          </div>
          <div className="my-2">
            <input type="checkbox" onChange={()=>setIsPermanentSameAsResidential(!isPermanentSameAsResidential)} ></input>{"   "}
            <label> Same as Residential Address</label>
          </div>
          <div className="row mb-4">
            <label>Permanent Address</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 1{!isPermanentSameAsResidential && <span className="req-star">*</span>}</label>
              <br />
              <input type="text" className="text-input" required={!isPermanentSameAsResidential} onChange={(e) => handleInputChange(e, "permanentAddress", "street1")}></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 2 {!isPermanentSameAsResidential && <span className="req-star">*</span>}</label>
              <br />
              <input type="text" className="text-input" required={!isPermanentSameAsResidential} onChange={(e) => handleInputChange(e, "permanentAddress", "street2")}></input>
            </div>
          </div>

          {/* file data */}
          <div className="row mb-4">
            <label>Upload Documents</label>
            <button
              type="button"
              className="btn btn-success add-Doc btn-sm mt-3"
              onClick={addDocumentRow}
            >
              Add
            </button>
            {documentRows.map((rowIndex) => (
            <UploadDocument
              key={rowIndex}
              index={rowIndex}
              onAdd={addDocumentRow}
              onDelete={deleteDocumentRow}
              onFileChange={(file) => handleFileChange(file, rowIndex)}
              formData={formData}
            />
          ))}
          </div>

          <div className="text-center">
            <button type="submit" className="px-5 py-2 bg-secondary text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
