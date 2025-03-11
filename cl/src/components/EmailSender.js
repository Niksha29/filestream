import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmailSender = ({ downloadLink }) => {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    if (!downloadLink) {
      toast.error("Please upload a file first.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter a recipient email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/email/send", {
        fileUrl: downloadLink,  // ✅ Send correct file URL
        recipientEmail: email,
      });

      toast.success("Email sent successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      toast.error("Failed to send email.");
      console.error("Error response:", err.response?.data);
    }
  };

  return (
    <div className="email-section">
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />
      <button onClick={sendEmail} className="send-email-btn">
        Send Email
      </button>
    </div>
  );
};

export default EmailSender;
