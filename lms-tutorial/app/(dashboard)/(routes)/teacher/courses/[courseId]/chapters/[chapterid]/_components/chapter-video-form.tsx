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
  const [isClient, setIsClient] = useState(false); // To ensure client-side rendering
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

  // Use useEffect to make sure MuxPlayer is only rendered on the client
  useEffect(() => {
    setIsClient(true); // Set to true once the component has mounted on the client
  }, []);

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
          isClient && ( // Check if it's client-side
            <div className="relative aspect-video mt-2">
              <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
            </div>
          )
        )
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url?: string) => {
              // Directly pass the ufsUrl as the url parameter
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
