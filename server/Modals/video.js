import mongoose from "mongoose";

const videochema = mongoose.Schema(
  {
    videotitle: { type: String, required: true },
    videoUrl: { type: String, required: true },

    // ✅ ADD THIS
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    filetype: String,
    filesize: String,
    uploader: String,
    Like: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("videofiles", videochema);
