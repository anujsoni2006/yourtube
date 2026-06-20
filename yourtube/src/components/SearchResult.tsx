import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosInstance from "@/lib/axiosinstance";
const SearchResult = ({ query }: any) => {
  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          Enter a search term to find videos and channels.
        </p>
      </div>
    );
  }
  const [video, setvideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [durations, setDurations] = useState<Record<string, number>>({});

  const handleLoadedMetadata = (id: string, duration: number) => {
    setDurations((prev) => ({ ...prev, [id]: duration }));
  };

  const formatDuration = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return "";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/video/getall");
        const filtered = res.data.filter(
          (vid: any) =>
            vid.videotitle?.toLowerCase().includes(query.toLowerCase()) ||
            vid.uploader?.toLowerCase().includes(query.toLowerCase()) ||
            vid.channelId?.channelName?.toLowerCase().includes(query.toLowerCase())
        );
        setvideos(filtered);
      } catch (error) {
        console.error("Error searching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading search results...</p>
      </div>
    );
  }

  if (video.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-gray-600">
          Try different keywords or remove search filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Results */}
      <div className="space-y-4">
        {video.map((vidItem: any) => (
          <div key={vidItem._id} className="flex gap-4 group">
            <Link href={`/watch/${vidItem._id}`} className="flex-shrink-0">
              <div className="relative w-80 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={vidItem.videoUrl?.startsWith("http") ? vidItem.videoUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${vidItem.videoUrl}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  preload="metadata"
                  onLoadedMetadata={(e) => handleLoadedMetadata(vidItem._id, e.currentTarget.duration)}
                />
                {durations[vidItem._id] !== undefined && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                    {formatDuration(durations[vidItem._id])}
                  </div>
                )}
              </div>
            </Link>

            <div className="flex-1 min-w-0 py-1">
              <Link href={`/watch/${vidItem._id}`}>
                <h3 className="font-medium text-lg line-clamp-2 group-hover:text-blue-600 mb-2">
                  {vidItem.videotitle}
                </h3>
              </Link>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span>{vidItem.views.toLocaleString()} views</span>
                <span>•</span>
                <span>
                  {formatDistanceToNow(new Date(vidItem.createdAt))} ago
                </span>
              </div>

              <Link
                href={`/channel/${vidItem.channelId?._id || vidItem.channelId}`}
                className="flex items-center gap-2 mb-2 hover:text-blue-600"
              >
                <Avatar className="w-6 h-6">
                  {vidItem.channelId?.image && <AvatarImage src={vidItem.channelId.image} />}
                  <AvatarFallback className="text-xs">
                    {(vidItem.channelId?.channelName || vidItem.uploader)?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">
                  {vidItem.channelId?.channelName || vidItem.uploader}
                </span>
              </Link>

              <p className="text-sm text-gray-700 line-clamp-2">
                {vidItem.description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Results */}
      <div className="text-center py-8">
        <p className="text-gray-600">
          Showing {video.length} results for "{query}"
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
