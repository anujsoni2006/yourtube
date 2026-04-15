import mongoose from "mongoose";

const videochema = mongoose.Schema(
  {
    videotitle: { type: String, required: true },
    videoUrl: { type: String, required: true }, // ✅ new
    filetype: { type: String },
    filesize: { type: String },
    videochanel: { type: String },
    Like: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    uploader: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("videofiles", videochema);

// import mongoose from "mongoose";
// const videochema = mongoose.Schema(
//   {
//     videotitle: { type: String, required: true },
//     filename: { type: String, required: true },
//     filetype: { type: String, required: true },
//     filename: { type: String, required: true },
//     videoUrl: { type: String, required: true },
//     filesize: { type: String, required: true },
//     videochanel: { type: String, required: true },
//     Like: { type: Number, default: 0 },
//     views: { type: Number, default: 0 },
//     uploader: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("videofiles", videochema);
