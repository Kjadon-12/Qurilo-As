import React, { useState } from "react";

const UploadDocument = ({ onAdd, onDelete, index }) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  return (
    <div className="row mb-4">
      
      <div className="col-lg-4 col-md-12 col-sm-12">
        <label className="text-muted">File Name*</label>
        <br />
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="text-input"
        ></input>
      </div>
      <div className="col-lg-3 col-md-12 col-sm-12">
        <label className="text-muted">Type of file*</label>
        <br />
        <select
          value={fileType}
          onChange={handleFileTypeChange}
          className="text-input"
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="image">Image</option>
          <option value="pdf">PDF</option>
        </select>
        <div className="text-muted">(image,pdf)</div>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <label className="text-muted">Upload File*</label>
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.value)}
          className="text-input"
        ></input>
      </div>
      <div className="col-lg-1 col-md-12 col-sm-12">
        {index !== 0 && (
          <button
            type="button"
            className="btn btn-danger btn-sm mt-4"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};


export default UploadDocument;
