-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "departments_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_departments" ("id", "locationId", "name", "version") SELECT "id", "locationId", "name", "version" FROM "departments";
DROP TABLE "departments";
ALTER TABLE "new_departments" RENAME TO "departments";
CREATE TABLE "new_folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "folders_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_folders" ("departmentId", "id", "name", "version") SELECT "departmentId", "id", "name", "version" FROM "folders";
DROP TABLE "folders";
ALTER TABLE "new_folders" RENAME TO "folders";
CREATE TABLE "new_lists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lists_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lists" ("departmentId", "id", "name", "version") SELECT "departmentId", "id", "name", "version" FROM "lists";
DROP TABLE "lists";
ALTER TABLE "new_lists" RENAME TO "lists";
CREATE TABLE "new_locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_locations" ("id", "name", "version") SELECT "id", "name", "version" FROM "locations";
DROP TABLE "locations";
ALTER TABLE "new_locations" RENAME TO "locations";
CREATE TABLE "new_docs" (
    "did" TEXT NOT NULL PRIMARY KEY,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "docs_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_docs" ("departmentId", "did", "name", "version") SELECT "departmentId", "did", "name", "version" FROM "docs";
DROP TABLE "docs";
ALTER TABLE "new_docs" RENAME TO "docs";
CREATE TABLE "new_sprintFolders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sprintFolders_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sprintFolders" ("departmentId", "id", "name", "version") SELECT "departmentId", "id", "name", "version" FROM "sprintFolders";
DROP TABLE "sprintFolders";
ALTER TABLE "new_sprintFolders" RENAME TO "sprintFolders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
