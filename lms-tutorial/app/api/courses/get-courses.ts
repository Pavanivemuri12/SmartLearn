import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get(`api/courses/get-courses?q=nextjs`); // e.g., /api/courses/get-courses?q=nextjs

  try {
    let courses;

    if (query) {
      // Search using the PostgreSQL view
      courses = await db.$queryRaw`
        SELECT c.*
        FROM "Course" c
        JOIN "CourseSearch" cs ON c.id = cs.id
        WHERE cs.search_vector @@ plainto_tsquery('english', ${query});
      `;
    } else {
      // Return all published courses
      courses = await db.course.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          chapters: true,
        },
      });
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
