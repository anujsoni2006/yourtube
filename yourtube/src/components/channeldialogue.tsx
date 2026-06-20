import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";

const Channeldialogue = ({ isopen, onclose, channeldata, mode }: any) => {
  const { user, login } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  // ✅ Fill form correctly for create/edit mode
  useEffect(() => {
    if (channeldata && mode === "edit") {
      setFormData({
        name:
          channeldata.channelName ||
          channeldata.channelname ||
          channeldata.name ||
          "",
        description: channeldata.description || "",
      });
    } else {
      setFormData({
        name:
          user?.channelName ||
          user?.channelname ||
          user?.name ||
          "",
        description: user?.description || "",
      });
    }
  }, [channeldata, mode, user]);

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Create / Update channel
  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      console.error("User not found");
      return;
    }

    try {
      setisSubmitting(true);

      const payload = {
        channelName: formData.name.trim(),
        description: formData.description.trim(),
      };

      const response = await axiosInstance.patch(
        `/user/update/${user._id}`,
        payload
      );

      // ✅ Updated user from backend
      const updatedUser = response.data.result;

      // ✅ Refresh AuthContext instantly
      login(updatedUser);

      // ✅ Reset form
      setFormData({
        name: "",
        description: "",
      });

      // ✅ Close dialog
      onclose();

      // ✅ Go to correct channel page
      await router.replace(`/channel/${updatedUser._id}`);
    } catch (error) {
      console.error("Channel update failed:", error);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <Dialog open={isopen} onOpenChange={onclose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create your channel"
              : "Edit your channel"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handlesubmit} className="space-y-6">
          {/* ✅ Channel Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Channel Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter channel name"
              required
            />
          </div>

          {/* ✅ Channel Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Channel Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell viewers about your channel..."
            />
          </div>

          {/* ✅ Footer Buttons */}
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onclose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                ? "Create Channel"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Channeldialogue;
