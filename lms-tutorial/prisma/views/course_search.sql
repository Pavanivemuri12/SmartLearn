CREATE VIEW "CourseSearch" AS
SELECT
  id,
  title,
  to_tsvector('english', title) AS search_vector
FROM "Course";
