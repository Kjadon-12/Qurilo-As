import React, { useState } from "react";

const UploadDocument = ({ onAdd, onDelete, index , onFileChange , formData}) => {
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState('')

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      uploadedFile: uploadedFile,
      fileName: fileName,
      fileType: fileType,
    };
    onFileChange(updatedDocuments[index], index);
  };
  return (
    <div className="row mb-4">
      
      <div className="col-lg-4 col-md-12 col-sm-12">
        <label className="text-muted">File Name <span className="req-star">*</span></label>
        <br />
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="text-input"
          required
        ></input>
      </div>
      <div className="col-lg-3 col-md-12 col-sm-12">
        <label className="text-muted">Type of file <span className="req-star">*</span></label>
        <br />
        <select
          value={fileType}
          onChange={handleFileTypeChange}
          className="text-input"
          required
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
        <label className="text-muted">Upload File <span className="req-star">*</span></label>
        <br />
        <input
          type="file"
          onChange={handleFileUpload}
          className="text-input"
          required
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
