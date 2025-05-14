import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // Fetching the purchase status
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    // Fetching course details
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    // Fetching chapter details
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      return {
        chapter: null,
        course: null,
        muxData: null,
        attachments: [],
        nextChapter: null,
        userProgress: null,
        purchase: null,
        error: "Chapter or course not found",
      };
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    // If the user has purchased the course, fetch attachments
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    // Fetch mux data for free chapters or purchased chapters
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapter.id,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    // Fetching user progress for the current chapter
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      error: null,  // No errors
    };
    
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      error: "Internal server error",
    };
  }
};
