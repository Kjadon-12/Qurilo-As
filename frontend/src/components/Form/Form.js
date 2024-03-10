import React, { useState   } from "react";
import UploadDocument from "../UploadDocument";
import axios from "axios";
const Form = () => {
  const [documentRows, setDocumentRows] = useState([0, 1]); // Initialize with two rows
  const [ageWarn, setAgeWarn] = useState(false);
  const [isPermanentSameAsResidential, setIsPermanentSameAsResidential] =
    useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    residentialAddress: {
      street1: "",
      street2: "",
    },
    permanentAddress: {
      street1: "",
      street2: "",
    },
    documents: [
      {
        uploadedFile: null,
      },
    ],
  });

  const addDocumentRow = () => {
    setDocumentRows([...documentRows, documentRows.length]);
  };

  const deleteDocumentRow = (index) => {
    if (documentRows?.length === 2) {
      console.log("can not delete document");
      return;
    }
    const updatedRows = documentRows.filter((rowIndex) => rowIndex !== index);
    setDocumentRows(updatedRows);
    const updatedDocuments = [...formData.documents];
    updatedDocuments.splice(index, 1);
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const handleInputChange = (event, field, subfield = null) => {
    const value = subfield
      ? { ...formData[field], [subfield]: event.target.value }
      : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();

    // Check if the age is at least 18 years
    const currentDate = new Date();
    const dobDate = new Date(formData.dob);
   
    const age = currentDate.getFullYear() - dobDate.getFullYear();
    
    if (age < 18 || dobDate.toString() === "Invalid Date") {
     
      setAgeWarn(true);
      console.log("Age should be at least 18 years");
      setFormData({
        ...formData,
        dob: "",
      });
      return;
    } else {
      
      const postData = async () => {
        try {
          const formDataToSend = new FormData();
          formDataToSend.append("firstName", formData?.firstName);
          formDataToSend.append("lastName", formData?.lastName);
          formDataToSend.append("email", formData?.email);
          formDataToSend.append("dob", formData?.dob);
          formDataToSend.append(
            "residentialAddress",
            JSON.stringify(formData?.residentialAddress)
          );
          formDataToSend.append(
            "permanentAddress",
            JSON.stringify(formData?.permanentAddress)
          );
          
          formData.documents.forEach((document, index) => {
            if (document.uploadedFile) {
            //    formDataToSend.append(`documents[${index}][uploadedFile]`, document.uploadedFile);
              formDataToSend.append(
                `documents[${index}][uploadedFile]`,
                JSON.stringify({
                  actualFileName: document.uploadedFile.name,
                  actualFileType: document.uploadedFile.type,
                })
              );
              formDataToSend.append(
                `documents[${index}][fileName]`,
                document.fileName
              );
              formDataToSend.append(
                `documents[${index}][fileType]`,
                document.fileType
              );
              }
          });
         
// // Log formDataToSend to verify its contents
// for (var pair of formDataToSend.entries()) {
//   console.log(pair[0] + ', ' + pair[1]);
// }
          console.log(formData);
          const response = await axios.post(
            "http://localhost:8000/v1/form",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          // console.log(response);
          // Reset the form after successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      residentialAddress: {
        street1: "",
        street2: "",
      },
      permanentAddress: {
        street1: "",
        street2: "",
      },
      documents: [
        {
          uploadedFile: null,
        },
      ],
    });
    // Reload the page/UI
    window.location.reload();
        } catch (error) {
          // console.error("Error submitting form:", error);
          alert(`Error from backend: ${error.response.data.error}`)
        }
      };
      postData();
    }

   
  };
  return (
    <>
      <div className="form container-form mt-5 p-3">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>
                First Name <span className="req-star">*</span>
              </label>
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
              <label>
                Last Name <span className="req-star">*</span>
              </label>
              <br />
              <input
                type="text"
                className="text-input"
                placeholder="Enter your last name here..."
                required="true"
                onChange={(e) => handleInputChange(e, "lastName")}
              ></input>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>
                E-mail <span className="req-star">*</span>
              </label>
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
              <label>
                Date of Birth <span className="req-star">*</span>
              </label>
              <br />
              <input
                type="date"
                className="text-input"
                placeholder="Enter your last name here..."
                required
                onChange={(e) => handleInputChange(e, "dob")}
              ></input>
              <div className={ageWarn ? "req-star" : ""}>
                (Min. age should be 18 years)
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <label className="mb-2">Residential Address</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">
                Street 1 <span className="req-star">*</span>
              </label>
              <br />
              <input
                type="text"
                className="text-input"
                required
                onChange={(e) =>
                  handleInputChange(e, "residentialAddress", "street1")
                }
              ></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">
                Street 2 <span className="req-star">*</span>
              </label>
              <br />
              <input
                type="text"
                className="text-input"
                required
                onChange={(e) =>
                  handleInputChange(e, "residentialAddress", "street2")
                }
              ></input>
            </div>
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              onChange={() =>
                setIsPermanentSameAsResidential(!isPermanentSameAsResidential)
              }
            ></input>
            {"   "}
            <label> Same as Residential Address</label>
          </div>
          <div className="row mb-4">
            <label>Permanent Address</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">
                Street 1
                {!isPermanentSameAsResidential && (
                  <span className="req-star">*</span>
                )}
              </label>
              <br />
              <input
                type="text"
                className="text-input"
                required={!isPermanentSameAsResidential}
                onChange={(e) =>
                  handleInputChange(e, "permanentAddress", "street1")
                }
              ></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">
                Street 2{" "}
                {!isPermanentSameAsResidential && (
                  <span className="req-star">*</span>
                )}
              </label>
              <br />
              <input
                type="text"
                className="text-input"
                required={!isPermanentSameAsResidential}
                onChange={(e) =>
                  handleInputChange(e, "permanentAddress", "street2")
                }
              ></input>
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
               
                formData={formData}
                setFormData={setFormData}
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
