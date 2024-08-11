-- database: /home/dave/code/SmartNgRX/database.db

SELECT departments.id, docs.did from departments
JOIN docs
ORDER BY departments.id, docs.created;

SELECT id from (SELECT folders.departmentId, concat('folders:', folders.id) as id, folders.name, folders.created FROM folders
UNION ALL SELECT docs.departmentId, concat('docs:', docs.did) as id, docs.name, docs.created FROM docs
UNION ALL SELECT sprintFolders.departmentId, concat('sprintFolders:', sprintFolders.id) as id, sprintFolders.name, sprintFolders.created FROM sprintFolders
UNION ALL SELECT lists.departmentId, concat('lists:', lists.id), lists.name as id, lists.created from lists)
WHERE departmentId = '05637cff-f984-4bbf-9b1a-3c159f91c3a6'
ORDER BY created
LIMIT 10 OFFSET 0;

SELECT count(*) from (
SELECT folders.departmentId FROM folders
UNION ALL SELECT docs.departmentId FROM docs
UNION ALL SELECT sprintFolders.departmentId FROM sprintFolders
UNION ALL SELECT lists.departmentId from lists)
WHERE departmentId = '05637cff-f984-4bbf-9b1a-3c159f91c3a6';
