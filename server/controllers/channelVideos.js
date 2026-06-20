import mongoose from "mongoose";
import Video from "../Modals/video.js";

// ✅ GET videos by channelId

export const getChannelVideos = async (req, res) => {
  try {
    const { channelId } = req.params;

    // 🔥 FORCE STRING + CLEAN
    const cleanId = String(channelId).trim();

    console.log("CLEAN ID:", cleanId);
    console.log("TYPE:", typeof cleanId);
    console.log("LENGTH:", cleanId.length);
    console.log("VALID:", mongoose.Types.ObjectId.isValid(cleanId));
    // 🔍 validation
    if (!cleanId || !mongoose.Types.ObjectId.isValid(cleanId)) {
      return res.status(400).json({
        message: "Invalid channelId",
      });
    }
    const objectId = new mongoose.Types.ObjectId(cleanId);

    // 📦 fetch videos
    const videos = await Video.find({ channelId: objectId })
      .populate("channelId", "name image")
      .sort({ createdAt: -1 }); // latest first

    // ✅ response
    return res.status(200).json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error("Error fetching channel videos:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching videos",
    });
  }
};
