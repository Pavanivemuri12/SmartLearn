import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const searchCourses = async (query: string) => {
  return await prisma.$queryRaw`
    SELECT id, title
    FROM "CourseSearch"
    WHERE search_vector @@ plainto_tsquery('english', ${query});
  `;
};
