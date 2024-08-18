# Description

## Run on dev

1. Clone the repository
2. Copy the file ```.env.template```, rename to ```.env``` and change the environment variables.
3. Install dependencies ```run install```
4. Run the DB ```docker compose up -d```
5. Run prisma ```npx prisma init --datasource-provider postgresql```
6. Run prisma ```npx prisma migrate dev```
7. Run seed ```npm run seed``` to init our database
8. Run the project ```npm run dev```


Prisma xext steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/beyond-the-orm

## Run on prod