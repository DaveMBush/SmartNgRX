-- database: /home/dave/code/SmartNgRX/database.db

SELECT departments.id, docs.did from departments
JOIN docs
ORDER BY departments.id, docs.created;

SELECT * from (SELECT folders.departmentId, folders.id, folders.name, folders.created FROM folders
UNION SELECT docs.departmentId, docs.did, docs.name, docs.created FROM docs
UNION SELECT sprintFolders.departmentId, sprintFolders.id, sprintFolders.name, sprintFolders.created FROM sprintFolders
UNION SELECT lists.departmentId, lists.id, lists.name, lists.created from lists)
WHERE departmentId = '05637cff-f984-4bbf-9b1a-3c159f91c3a6'
ORDER BY created
LIMIT 10 OFFSET 0;
