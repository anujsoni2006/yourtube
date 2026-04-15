import Video from "../Modals/video.js";
import cloudinary from "../config/cloudinary.js";



export const getallvideo = async (req, res) => {
  try {
    const files = await Video.find();
    return res.status(200).send(files);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const uploadvideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Upload mp4 file only" });
    }

    // buffer → base64
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "video",
      folder: "videos",
    });

    // save in DB
    const file = new Video({
      videotitle: req.body.videotitle,
      videoUrl: result.secure_url, // ✅ main change
      filetype: req.file.mimetype,
      filesize: req.file.size,
      videochanel: req.body.videochanel,
      uploader: req.body.uploader,
    });

    await file.save();

    return res.status(201).json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
};
// export const uploadvideo = async (req, res) => {
//   if (req.file === undefined) {
//     return res
//       .status(404)
//       .json({ message: "plz upload a mp4 video file only" });
//   } else {
//     try {
//       const file = new video({
//         videotitle: req.body.videotitle,
//         filename: req.file.originalname,
//         videoUrl: req.file.path,
//         filetype: req.file.mimetype,
//         filesize: req.file.size,
//         videochanel: req.body.videochanel,
//         uploader: req.body.uploader,
//       });
//       await file.save();
//       return res.status(201).json("file uploaded successfully");
//     } catch (error) {
//       console.error(" error:", error);
//       return res.status(500).json({ message: "Something went wrong" });
//     }
//   }
// };


