import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmailSender from "./EmailSender";
import "./FileUploader.css";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [expiration, setExpiration] = useState(60);
  const [downloadLink, setDownloadLink] = useState("");  // 🔹 Now passes to EmailSender

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);
    formData.append("expiration", expiration);

    try {
      const response = await axios.post("http://localhost:5000/api/files/upload", formData);
      const fileId = response.data.fileId;

      if (fileId) {
        const fileUrl = `http://localhost:3000/download/${fileId}`;
        setDownloadLink(fileUrl);
      }

      toast.success("File uploaded successfully!");
    } catch (err) {
      toast.error("File upload failed.");
      console.error("Error uploading file:", err.response?.data);
    }
  };

  return (
    <div className="file-uploader-container">
      {/* File Drop Zone */}
      <label className="file-drop-zone">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} hidden />
        {file ? file.name : "Drag & drop a file or click to upload"}
      </label>

      {/* Password Input */}
      <input 
        type="password" 
        placeholder="Password (Optional)" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="upload-input" 
      />

      {/* Expiration Input */}
      <input 
        type="number" 
        placeholder="Expiration (minutes)" 
        value={expiration} 
        onChange={(e) => setExpiration(e.target.value)} 
        className="upload-input" 
      />

      {/* Upload Button */}
      <button onClick={uploadFile} className="upload-btn">
        Upload File
      </button>

      {/* Download Link Display */}
      {downloadLink && (
        <div className="download-box">
          <p><strong>Download Link:</strong></p>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="download-link">
            {downloadLink}
          </a>
        </div>
      )}

      {/* Email Sender Component (Passes downloadLink as a Prop) */}
      <EmailSender downloadLink={downloadLink} />
    </div>
  );
};

export default FileUploader;
