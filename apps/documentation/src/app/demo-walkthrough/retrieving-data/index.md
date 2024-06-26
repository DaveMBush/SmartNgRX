# Retrieving Data

Now that we understand the structure of the database, let's look at how we retrieve data from the database using our server code.

We are using NestJS to create our server code in combination with Prisma to interact with the database. NestJS is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript and is built with TypeScript. Prisma is a modern database toolkit that makes it easy to interact with databases in a type-safe way.

You can find the server code in [apps/server/src/app](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/server/src/app) directory.

We won't go into the details of how to set up a NestJS server or how to use Prisma in this walkthrough. Instead, we'll focus on how we retrieve data from the database.

## Retrieving Top Level Data

Remember that our Locations table is our top level table. To load it in a way that SmartNgRX can use, we need to create a pseudo table. In our code, we name this pseudo table `top`. We'll come back to this later when we look at the client code. For now, we need to remember what we are dealing with so we know why we are doing things the way we are on the server.

On the server, look at the code in [apps/server/src/app/top/top.controller.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/server/src/app/top/top.controller.ts). You'll see that we have one method in the controller that retrieves all the location ids from the locations table and returns them in a pseudo row.

## Retrieving Child Data

### Locations

Locations represents a straight forward way of retrieving child data. Look at the code in [apps/server/src/app/locations/locations.controller.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/server/src/app/locations/locations.controller.ts#L21-L49). Here, you will see the that we retrieve all the fields from a row as well as all the child ids for the departments that are associated with the location.

### Departments

Retrieving the departments data is similar except that we need to retrieve the IDs for multiple child tables that need to appear as though they are all part of the same table. In most databases, you could use a UNION to do this. SqlLite3 doesn't support UNIONS so we've done it using TypeScript. You can view the code for this here: [apps/server/src/app/departments/departments.controller.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/server/src/app/departments/department.controller.ts#L46-L72).

Note, the consolidateChildren method that is used in the map() at the end of the function is used to adjust the IDs so the client knows what table they belong to and to order the resulting IDs in the order they were created.

### An Alternate Way to Retrieve Departments

We could have done all this same work on the server in the EffectsService that retrieves the Departments, but we chose to do it in the controller because, in most case, doing the work on the server will have better performance. It will also provide greater flexibility as we embellish the server to cover more complex scenarios.

### Retrieving The Remaining Tables

The remaining tables retrieve data similar to how we retrieved data for locations. You can view the code for these in their respective controller files.

> [!NOTE]
> While the "standard" way of retrieving data from a server uses a GET method, we use a POST. This gives us greater flexibility in how we retrieve data. We can pass in as many parameters to the server as we need without being concerned about how long the resulting URL is.
