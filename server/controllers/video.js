import Video from "../Modals/video.js";
import cloudinary from "../config/cloudinary.js";

export const getallvideo = async (req, res) => {
  try {
    const files = await Video.find().populate("channelId", "name channelName image description");
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
      channelId: req.body.channelId,
      uploader: req.body.uploader,
      description: req.body.description || "",
    });

    await file.save();

    return res.status(201).json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
};
