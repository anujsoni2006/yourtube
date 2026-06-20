"use client";

import { useUser } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axiosinstance";

// 👉 Components
import ChannelHeader from "@/components/ChannelHeader";
import Channeltabs from "@/components/Channeltabs";
import VideoUploader from "@/components/VideoUploader";
import ChannelVideos from "@/components/ChannelVideos";

interface Video {
  _id: string;
  videotitle: string;
  videoUrl: string;
}

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, loading: userLoading } = useUser();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ✅ Always prefer URL id (channel page), fallback to logged-in user
  const channelId = typeof id === "string" ? id : user?._id;

  useEffect(() => {
    if (!router.isReady || typeof id !== "string") return;

    const cleanId = id.trim();

    console.log("🚀 Calling API with:", cleanId);

    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/channel/${cleanId}/videos`);
        console.log("✅ Response:", res.data);

        setVideos(res.data.videos || []);
      } catch (err) {
        console.error("❌ Error fetching videos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [router.isReady, id]);

  // 🛑 Wait until user loads
  if (userLoading) {
    return <div className="p-4">Loading user...</div>;
  }

  return (
    <div className="flex-1 min-h-screen bg-white">
      <div className="max-w-full mx-auto">
        {/* ⚠️ IMPORTANT: ChannelHeader should NOT always use logged-in user */}
        <ChannelHeader channelId={channelId} />

        <Channeltabs />

        {/* ✅ Only allow upload if it's YOUR channel */}
        <div className="px-4 pb-8">
          {user?._id === channelId && (
            <VideoUploader channelId={channelId} user={user} />
          )}
        </div>

        {/* 🎥 Videos Section */}
        <div className="px-4 pb-8">
          {loading ? (
            <p>Loading videos...</p>
          ) : error ? (
            <p>Something went wrong</p>
          ) : videos.length === 0 ? (
            <p>No videos uploaded yet</p>
          ) : (
            <ChannelVideos videos={videos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
