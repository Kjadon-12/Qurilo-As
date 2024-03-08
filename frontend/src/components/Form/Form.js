import React ,{useState} from "react";
import UploadDocument from "../UploadDocument";

const Form = () => {
    const [documentRows, setDocumentRows] = useState([0, 1]); // Initialize with two rows

  const addDocumentRow = () => {
    setDocumentRows([...documentRows, documentRows.length]);
  };

  const deleteDocumentRow = (index) => {
    const updatedRows = documentRows.filter((rowIndex) => rowIndex !== index);
    setDocumentRows(updatedRows);
  };
  return (
    <>
      <div className="form container-form mt-5 p-3">
        <form>
          <div className="row mb-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>First Name*</label>
              <br />
              <input
                type="text"
                className="text-input"
                placeholder="Enter your first name here..."
                required
              ></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>Last Name*</label>
              <br />
              <input
                type="text"
                className="text-input"
                placeholder="Enter your last name here..."
              ></input>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>E-mail*</label>
              <br />
              <input
                type="email"
                className="text-input"
                placeholder="ex:myname@example.com"
              ></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label>Date of Birth*</label>
              <br />
              <input
                type="date"
                className="text-input"
                placeholder="Enter your last name here..."
              ></input>
              <div>(Min. age should be 18 years)</div>
            </div>
          </div>
          <div className="row mb-4">
            <label className="mb-2">Residential Address</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 1*</label>
              <br />
              <input type="text" className="text-input"></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 2*</label>
              <br />
              <input type="text" className="text-input"></input>
            </div>
          </div>
          <div className="my-2">
            <input type="checkbox"></input>{" "}
            <label> Same as Residential Address</label>
          </div>
          <div className="row mb-4">
            <label>Permanent Address</label>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 1*</label>
              <br />
              <input type="text" className="text-input"></input>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <label className="text-muted">Street 2*</label>
              <br />
              <input type="text" className="text-input"></input>
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