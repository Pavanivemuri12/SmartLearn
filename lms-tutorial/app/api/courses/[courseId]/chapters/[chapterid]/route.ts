import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

// Initialize Mux client
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function PATCH(
  req: Request,
  context: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const { isPublished, ...values } = await req.json();

    const { courseId, chapterId } = context.params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
        isPublished, // ✅ Include this only if needed, or remove if unused
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      // Create video asset using the video URL
      const asset = await mux.video.assets.create({
        inputs: [{ url: values.videoUrl }],
        playback_policy: ["public"],
        test: false,
      });

      // Check if the asset is ready (polling approach)
      let assetStatus = asset.status;

      // Poll until the asset is ready
      while (assetStatus !== "ready") {
        console.log(`Waiting for asset ${asset.id} to be ready...`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
        // Check asset status manually (this assumes `status` is available directly)
        const updatedAsset = await mux.video.assets.get(asset.id); // Using asset ID
        assetStatus = updatedAsset.status;
      }

      await db.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
