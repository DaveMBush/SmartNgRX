BEGIN EXCLUSIVE TRANSACTION;

CREATE TABLE IF NOT EXISTS scriptVersions (
  id integer NOT NULL PRIMARY KEY,
  lastVersion varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
  id integer NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  version integer NOT NULL default 1
);

CREATE TRIGGER UpdateLocationVersion
  AFTER UPDATE ON locations
  BEGIN
    UPDATE locations SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TABLE IF NOT EXISTS departments (
  id integer NOT NULL PRIMARY KEY,
  locationId integer NOT NULL,
  name varchar(255) NOT NULL,
  version integer NOT NULL default 1
);

CREATE TRIGGER UpdateDepartmentVersion
  AFTER UPDATE ON departments
  BEGIN
    UPDATE departments SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TABLE IF NOT EXISTS folders (
  id integer NOT NULL PRIMARY KEY,
  departmentId integer NOT NULL,
  name varchar(255) NOT NULL,
  version integer NOT NULL default 1
);

CREATE TRIGGER UpdateFolderVersion
  AFTER UPDATE ON folders
  BEGIN
    UPDATE folders SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TABLE IF NOT EXISTS sprintFolders (
  id integer NOT NULL PRIMARY KEY,
  departmentId integer NOT NULL,
  name varchar(255) NOT NULL,
  version integer NOT NULL default 1
);

CREATE TRIGGER UpdateSprintFolderVersion
  AFTER UPDATE ON sprintFolders
  BEGIN
    UPDATE sprintFolders SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TABLE IF NOT EXISTS lists (
  id integer NOT NULL PRIMARY KEY,
  departmentId integer NOT NULL,
  name varchar(255) NOT NULL,
  version integer NOT NULL default 1
);

CREATE TRIGGER UpdateListVersion
  AFTER UPDATE ON lists
  BEGIN
    UPDATE lists SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TABLE IF NOT EXISTS docs (
  id integer NOT NULL PRIMARY KEY,
  departmentId integer NOT NULL,
  name varchar(255) NOT NULL,
  version integer NOT NULL default 1
);

CREATE TRIGGER UpdateDocVersion
  AFTER UPDATE ON docs
  BEGIN
    UPDATE docs SET version = version + 1 WHERE id = NEW.id;
  END;

INSERT INTO scriptVersions (lastVersion) VALUES ('1.0.0');

END TRANSACTION;
