// import express from "express";
// import { getallvideo, uploadvideo } from "../controllers/video.js";
// import upload from "../filehelper/filehelper.js";

// const routes = express.Router();

// routes.post("/upload", (req, res) => {
//   upload.single("video")(req, res, async (err) => {

//     // 🔥 HANDLE MULTER ERROR
//     if (err) {
//       console.error("❌ MULTER ERROR:", err);

//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }

//     try {
//       console.log("FILE:", req.file);
//       console.log("BODY:", req.body);

//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "No file uploaded",
//         });
//       }

//       // ✅ TEMP SUCCESS RESPONSE
//       return res.status(200).json({
//         success: true,
//         message: "Upload working perfectly",
//       });

//     } catch (error) {
//       console.error("❌ ROUTE ERROR:", error);

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   });
// });
// routes.get("/getall", getallvideo);
// export default routes;
import express from "express";
import { getallvideo, uploadvideo } from "../controllers/video.js";
import upload from "../filehelper/filehelper.js";

const routes = express.Router();

routes.post("/upload", upload.single("file"), uploadvideo);
routes.get("/getall", getallvideo);
export default routes;