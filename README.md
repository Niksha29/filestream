# FileStream

FileStream is a web application that allows users to upload files, generate shareable links, and stream files directly from the platform. It also includes optional  protection and the ability to email links to recipients securely.

## Features

✅ **File Upload** – Drag-and-drop files or use the file selector to upload files.  
✅ **Password Protection** – Set an optional password for secure access.  
✅ **Shareable Links** – Get a direct download link after uploading the file.  
✅ **Email Sharing** – Send the download link to a recipient’s email directly from the platform.  
✅ **Expiration Timer** – Optionally set a time limit for the link validity.  
✅ **Secure Storage** – Files are stored securely using MongoDB and Cloudinary.  

---

## Technologies Used

### **Frontend**
- React.js (Vite)
- Tailwind CSS

### **Backend**
- Node.js
- Express.js

### **Database**
- MongoDB

### **Cloud Storage**
- Cloudinary

### **Email Service**
- Nodemailer (using Google SMTP)

---

## Backend Setup

1. **Clone the repository**:

```bash
git clone https://github.com/Niksha29/filestream.git
cd filestream/backend
