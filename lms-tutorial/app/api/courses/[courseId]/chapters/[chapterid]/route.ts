//import { Video as VideoIcon } from 'lucide-react';
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

// Rename destructured `Video` to avoid conflict with `lucide-react` import
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const { isPublished, ...values } = await req.json();

    if (isPublished) {
      console.log("Course is published");
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({  // <-- changed model to muxData
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);  // <-- fixed "Assers" typo
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,  // <-- fixed "VideoUrl" casing
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({  // <-- changed to correct model name
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }
      });
    }

    return NextResponse.json(chapter);  // <-- moved outside if block
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
