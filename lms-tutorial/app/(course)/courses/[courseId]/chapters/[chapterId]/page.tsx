import { getChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { Banner } from "@/components/ui/banner";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";

import { File } from "lucide-react";
import { Preview } from "@/components/preview";
import { CourseProgress } from "@/components/ui/course-progress";
import { CourseProgressButton } from "./_components/course-progress-button";

type PageProps = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

const ChapterIdPage = async ({ params }: PageProps) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    purchase,
    muxData,
    attachments,
    nextChapter,
    userProgress,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        {userProgress?.isCompleted && (
          <Banner variant="success" label="You already completed this chapter" />
        )}
        {isLocked && (
          <Banner
            variant="warning"
            label="You need to purchase this course to watch this chapter"
          />
        )}

        {/* Center the video player */}
        <div className="flex justify-center pl-60 items-center">
          <div className="aspect-video w-[700px] h-[400px]">
            {muxData?.playbackId && (
              <VideoPlayer
                chapterId={params.chapterId}
                title={chapter.title}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                playbackId={muxData?.playbackId}
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 mt-8">
          <h2 className="text-2xl font-semibold flex-1">{chapter.title}</h2>
          <div className="text-lg font-medium text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
              {purchase ? (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <CourseEnrollButton
                  courseId={params.courseId}
                  price={course.price!}
                />
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-base">
          <Preview value={chapter.description ?? ""} />
        </div>

        {!!attachments.length && (
          <>
            <Separator />
            <div className="grid gap-4">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center p-3 bg-sky-200 border text-sky-700 rounded-md hover:underline gap-2"
                >
                  <File className="h-5 w-5" />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
