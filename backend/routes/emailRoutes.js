// import express from 'express';
// import nodemailer from 'nodemailer';
// import File from '../models/File.js';

// const router = express.Router();

// // Email sending route
// router.post('/send', async (req, res) => {
//   try {
//     const { fileUrl, recipientEmail } = req.body;

//     if (!fileUrl || !recipientEmail) {
//       return res.status(400).json({ error: 'Missing file URL or recipient email' });
//     }

//     // Find the file in the database using `fileUrl`
//     const file = await File.findOne({ fileUrl });

//     if (!file) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     // Configure email transport
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: recipientEmail,
//       subject: 'File Sharing Link',
//       text: `You have received a file. Click the link to download: ${file.fileUrl}`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;

import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email sending route
router.post('/send', async (req, res) => {
  try {
    const { fileUrl, recipientEmail } = req.body;

    if (!fileUrl || !recipientEmail) {
      return res.status(400).json({ error: 'Missing file URL or recipient email' });
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'File Sharing Link',
      text: `You have received a file. Click the link to download: ${fileUrl}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
