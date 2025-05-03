"use client";
import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterid: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Video URL is required",
  }),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterid,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isPlayable, setIsPlayable] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      formSchema.parse(values);
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterid}`, values);
      toast.success("Chapter updated.");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating chapter:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkMuxStatus = async () => {
      if (!initialData?.muxData?.playbackId) return;

      try {
        const res = await fetch(`https://stream.mux.com/${initialData.muxData.playbackId}.m3u8`, {
          method: "HEAD",
        });

        if (res.ok) {
          setIsPlayable(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error)
        console.log("Checking Mux playback availability...");
      }
    };

    if (initialData?.muxData?.playbackId) {
      interval = setInterval(checkMuxStatus, 3000);
    }

    return () => clearInterval(interval);
  }, [initialData?.muxData?.playbackId]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : !initialData.videoUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          isClient && (
            <div className="relative aspect-video mt-2">
              {isPlayable ? (
                <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-200 rounded-md">
                  <p className="text-sm text-muted-foreground">Processing video... please wait</p>
                </div>
              )}
            </div>
          )
        )
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url?: string) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video.
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the video does not appear.
        </div>
      )}
    </div>
  );
};
