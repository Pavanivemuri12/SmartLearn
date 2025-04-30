import { createUploadthing, type FileRouter } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Course Image uploaded:", file);
      console.log("userId",metadata.userId)
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(({  file }) => {
      console.log("Course Attachment uploaded:", file.url);
    }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "4GB" } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(({  file }) => {
      console.log("Chapter Video uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;