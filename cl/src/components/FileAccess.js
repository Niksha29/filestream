import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FileAccess.css";

const FileAccess = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    checkFile();
  }, []);

  const checkFile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/files/download/${id}`);
      setFileUrl(data.fileUrl);
      toast.success("File is ready to download!");
    } catch (err) {
      toast.error("This file may require a password.");
    } finally {
      setLoading(false);
    }
  };

  const accessFileWithPassword = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:5000/api/files/download/${id}`, { password });
      setFileUrl(data.fileUrl);
      toast.success("File unlocked! Click the download button.");
    } catch (err) {
      toast.error("Invalid password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Access File</h1>

      {fileUrl ? (
        <div className="download-box">
          <p>Click below to download your file:</p>
          <a href={fileUrl} download className="download-btn">Download File</a>
        </div>
      ) : (
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter password (if required)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={accessFileWithPassword} disabled={loading}>
            {loading ? "Checking..." : "Submit"}
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FileAccess;
