import User from "../Modals/auth.js";

export const getChannelById = async (req, res) => {
  try {
    
    const { channelId } = req.params;

    const channel = await User.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};