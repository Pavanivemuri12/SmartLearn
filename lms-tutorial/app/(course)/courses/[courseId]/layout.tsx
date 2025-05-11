import { auth } from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";


const CourseLayout = async({
    children,
    params
}: {
    children: React.ReactNode;
    params: {courseId: string };
}) => {
    const {userId} = await auth();

    if (!userId){
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
        },
        include:{
            chapters:{
            where:{
                isPublished: true,
            },
            include:{
                userProgress: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy:{
                position: "asc"
            }
        }
        },
    })

    if (!course){
        return redirect("/");
    }

    const progressCount = await getProgress(userId, course.id);
    return(
       <div className="relative h-screen w-full">
  {/* Sidebar */}
  <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 bg-gray-200 p-4">
    <p>Sidebar is working</p>
    <CourseSidebar
      course={course}
      progressCount={progressCount}
    />
  </div>

  {/* Main content */}
  <main className="h-full md:pl-80">
    {children}
  </main>
</div>

    )
}

export default CourseLayout