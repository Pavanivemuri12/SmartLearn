import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { LayoutDashboard, ListChecks, IndianRupee, File } from "lucide-react"; 
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form"
//import { ChaptersForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapter-forms";
import { Banner } from "@/components/ui/banner";
import { Actions } from "./_components/actions";



const CourseIdPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { courseId } = await params;

  const user = await auth();

  if (!user|| !user.userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId: user.userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    
    attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.log(categories);

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter=>chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields} / ${totalFields}`;

  const isComplete=requiredFields.every(Boolean);
  return (
    <>
    {!course.isPublished && (
         <Banner
               label="course is not published yet. It will not be visible to students."
         />
    )}
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        {/*Add Actions here*/}
        <Actions
        disabled={!isComplete}
        courseId={params.courseId}
        isPublished={course.isPublished}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl">Customize your course</h2>
        </div>

        <TitleForm
          initialData={course}
          courseId={course.id}
        />
        <DescriptionForm
          initialData={course}
          courseId={course.id}
        />
        <ImageForm
          initialData={course}
          courseId={course.id}
        />
        <CategoryForm
          initialData={{
            description: course.description,
            categoryId: course.categoryId ?? "", // fallback if null
          }}
          courseId={course.id}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </div>

      <div className="space-y-6 mt-16">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={ListChecks} />
          <h2 className="text-xl">
            Course chapters
          </h2>
        </div>
        <ChaptersForm
          initialData={course}
          courseId={course.id}
        />
      </div>

      <div className="mt-16 space-y-6">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={IndianRupee} />
          <h2 className="text-xl">
            Sell your course
          </h2>
        </div>
        <PriceForm
          initialData={course}
          courseId={course.id}
        />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={File} />
          <h2 className="text-xl">
            Resources & Attachments
          </h2>
        </div>
        <AttachmentForm
          initialData={course}
          courseId={course.id}
        />

      </div>
    </div>
    </>
  );
};

export default CourseIdPage;
