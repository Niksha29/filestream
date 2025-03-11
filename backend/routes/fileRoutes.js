
import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import File from '../models/File.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'raw' },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     uploadStream.end(buffer);
//   });
// };
const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: 'raw', 
        public_id: originalname
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { password, expiresIn } = req.body;
    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);


    const fileData = {
      filename: req.file.originalname,
      fileUrl: result.secure_url,
      expiresAt: expiresIn ? new Date(Date.now() + expiresIn * 60 * 1000) : null,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      fileData.password = await bcrypt.hash(password, salt);
    }

    const file = new File(fileData);
    await file.save();

    res.status(200).json({ 
      message: 'File uploaded successfully', 
      fileUrl: file.fileUrl, 
      fileId: file._id 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    if (file.password) {
      return res.status(401).json({ error: "Password required" });
    }

    res.status(200).json({ fileUrl: file.fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    if (file.password) {
      const match = await bcrypt.compare(req.body.password, file.password);
      if (!match) return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ fileUrl: file.fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
