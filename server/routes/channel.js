import express from "express";
import { getChannelVideos } from "../controllers/channelVideos.js";
import { getChannelById } from "../controllers/channel.js";

const router = express.Router();
//channel info
router.get("/:channelId", getChannelById);
// ✅ GET /channel/:channelId/videos
router.get("/:channelId/videos", getChannelVideos);

export default router;