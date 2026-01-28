import { Router } from "express";
import { upload } from "../../infrastructure/http/middlewares/Upload.js";

const uploadRoutes = Router();

uploadRoutes.post("/uploads", upload.array("files", 3), (req, res) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "Nenhum arquivo enviado." });
  }

  const urls = files.map(file => {
    return `http://localhost:3000/uploads/${file.filename}`;
  });

  return res.json({ urls });
});

export { uploadRoutes };
