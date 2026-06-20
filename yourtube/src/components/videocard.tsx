import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";

export default function VideoCard({ video }: any) {
  const [duration, setDuration] = useState<number | null>(null);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setDuration(e.currentTarget.duration);
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

  return (
    <Link href={`/watch/${video?._id}`} className="group">
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <video
            src={video?.videoUrl?.startsWith("http") ? video.videoUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${video?.videoUrl}`}
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
          />
          {duration !== null && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
              {formatDuration(duration)}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Avatar className="w-9 h-9 flex-shrink-0">
            {video?.channelId?.image && <AvatarImage src={video.channelId.image} />}
            <AvatarFallback>{video?.uploader?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
              {video?.videotitle}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{video?.uploader}</p>
            <p className="text-sm text-gray-600">
              {video?.views.toLocaleString()} views •{" "}
              {formatDistanceToNow(new Date(video?.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
