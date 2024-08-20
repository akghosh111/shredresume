const express = require("express");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

// Initialize Google Generative AI Client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Check if the upload folder exists, if not, create it
const uploadFolder = path.join(__dirname, "upload");
fs.ensureDirSync(uploadFolder);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint for file upload and AI processing
app.post("/upload", upload.array("Files"), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const roastPromises = files.map(async (file) => {
      const filePath = file.path;
      const fileData = fs.readFileSync(filePath);

      const prompt =
        "Take a look at this resume and give it a brutal, funny roast within 150 words. If it doesn't even resemble a proper resume, make sure to let the user know in a humorous way that they should submit an actual resume next time. Keep the tone light, witty, and a bit sarcastic";
      const pdfContent = {
        inlineData: {
          data: Buffer.from(fileData).toString("base64"),
          mimeType: "application/pdf",
        },
      };

      const result = await model.generateContent([prompt, pdfContent]);
      return result.response.text();
    });

    const roasts = await Promise.all(roastPromises);

    res.status(200).json({
      message: "Files uploaded and processed successfully.",
      roasted: roasts.join("\n\n"),
    });
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ error: "An error occurred during processing." });
  }
});

// Serve static files (optional, if you have a frontend)
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
