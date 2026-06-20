import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Channeldialogue from "./channeldialogue";
import { useUser } from "@/lib/AuthContext";

const Sidebar = () => {
  const { user } = useUser();

  const [isdialogeopen, setisdialogeopen] = useState(false);

  // ✅ Support both _id and id
  const userId = user?._id || user?.id;

  // ✅ Support old + new field names
  const hasChannel = !!(
    user?.channelName ||
    user?.channelname
  );

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-2">
      <nav className="space-y-1">
        {/* Home */}
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-5 h-5 mr-3" />
            Home
          </Button>
        </Link>

        {/* Explore */}
        <Link href="/explore">
          <Button variant="ghost" className="w-full justify-start">
            <Compass className="w-5 h-5 mr-3" />
            Explore
          </Button>
        </Link>

        {/* Subscriptions */}
        <Link href="/subscriptions">
          <Button variant="ghost" className="w-full justify-start">
            <PlaySquare className="w-5 h-5 mr-3" />
            Subscriptions
          </Button>
        </Link>

        {/* Logged-in only */}
        {user && (
          <div className="border-t pt-2 mt-2">
            {/* History */}
            <Link href="/history">
              <Button variant="ghost" className="w-full justify-start">
                <History className="w-5 h-5 mr-3" />
                History
              </Button>
            </Link>

            {/* Liked */}
            <Link href="/liked">
              <Button variant="ghost" className="w-full justify-start">
                <ThumbsUp className="w-5 h-5 mr-3" />
                Liked videos
              </Button>
            </Link>

            {/* Watch later */}
            <Link href="/watch-later">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="w-5 h-5 mr-3" />
                Watch later
              </Button>
            </Link>

            {/* ✅ Your Channel */}
            {hasChannel && userId ? (
              <Link href={`/channel/${userId}`}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-5 h-5 mr-3" />
                  Your channel
                </Button>
              </Link>
            ) : (
              <div className="px-2 py-1.5">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setisdialogeopen(true)}
                >
                  Create Channel
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ✅ Channel Dialog */}
      <Channeldialogue
        isopen={isdialogeopen}
        onclose={() => setisdialogeopen(false)}
        mode="create"
      />
    </aside>
  );
};

export default Sidebar;
