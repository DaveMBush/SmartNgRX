BEGIN EXCLUSIVE TRANSACTION;

CREATE TRIGGER UpdateLocationVersion
  AFTER UPDATE ON locations
  BEGIN
    UPDATE locations SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TRIGGER UpdateDepartmentVersion
  AFTER UPDATE ON departments
  BEGIN
    UPDATE departments SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TRIGGER UpdateFolderVersion
  AFTER UPDATE ON folders
  BEGIN
    UPDATE folders SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TRIGGER UpdateSprintFolderVersion
  AFTER UPDATE ON sprintFolders
  BEGIN
    UPDATE sprintFolders SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TRIGGER UpdateListVersion
  AFTER UPDATE ON lists
  BEGIN
    UPDATE lists SET version = version + 1 WHERE id = NEW.id;
  END;

CREATE TRIGGER UpdateDocVersion
  AFTER UPDATE ON docs
  BEGIN
    UPDATE docs SET version = version + 1 WHERE did = NEW.did;
  END;

END TRANSACTION;
