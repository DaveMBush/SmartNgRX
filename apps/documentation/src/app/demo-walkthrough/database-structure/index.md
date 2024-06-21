# Database Structure

The backend database uses SqlLite3, a lightweight database that is easy to use and set up. The database is stored in a file called `database.d` in the root of the project and is created and populated with data when you pnpm the project for the first time.

We use Prisma to interact with the database, including creating tables, inserting data, and querying data. Prisma is a modern database toolkit that makes it easy to interact with databases in a type-safe way. It is used to generate the database schema and typescript types from the database schema.

The database schema and subsequent changes are managed using Prisma Migrate. Prisma Migrate is a database schema migration tool that allows you to make changes to the database schema and apply those changes to the database.

You can find the Prisma schema in the [prisma/schema.prisma](https://github.com/DaveMBush/SmartNgRX/blob/main/prisma/schema.prisma)` file. This file defines the database schema and is used by Prisma to generate the database schema and typescript types.

## Tables

Currently all of our tables are structured the same with the expection of a field that points to the parent table's id. This is used to create a tree structure in the database.

The fields all tables have are:

- id: a unique identifier for the record as a guid.
- name: the name of the record.
- version: the version of the record as an integer that increments every time something gets updated.
- created: the timestamp for when the record was created, we use this to order the records in the UI.

The database has the following tables:

- locations: this is the top level table.
- departments: this table as a locationId field that points back to the locations table.
- docs: this table has a departmentId field that points back to the departments table.
- folders: this table has a departmentId field that points back to the departments table.
- lists: this table has a departmentId field that points back to the departments table.
- sprintFolders: this table has a departmentId field that points back to the departments table.

You'll notice that the docs, folders, lists, and sprintFolders tables all have a departmentId field that points back to the departments table. This allows these to all be children of the departments table.
