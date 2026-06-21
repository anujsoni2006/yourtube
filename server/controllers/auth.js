import mongoose from "mongoose";
import users from "../Modals/auth.js";

// LOGIN / SIGNUP
export const login = async (req, res) => {
  const { email, name, image } = req.body;

  try {
    // Check if user already exists
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      // Create new user with automatic channelId = _id
      const newUser = new users({
        email,
        name,
        image,
      });

      // Save first so Mongo generates _id
      await newUser.save();

      // Auto-assign channelId = user._id
      newUser.channelId = newUser._id.toString();

      // Save updated channelId
      await newUser.save();

      return res.status(201).json({
        message: "User created successfully",
        result: newUser,
      });
    }

    // Existing user login
    return res.status(200).json({
      message: "Login successful",
      result: existingUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// CREATE / UPDATE CHANNEL PROFILE
export const updateprofile = async (req, res) => {
  const { id: _id } = req.params;
  const { channelName, description } = req.body;

  // Validate Mongo ID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  try {
    // Update profile + ensure channelId always exists
    const updatedata = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          channelName,
          description,
          channelId: _id, // AUTO channelId = userId
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // If user not found
    if (!updatedata) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Channel updated successfully",
      result: updatedata,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
