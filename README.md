# Superhero database

The “Superhero database” is an application that allows us to do CRUD operations of the superhero model.

## Functionality

 - Create, edit and remove a superhero
 - List all the superheros
 - See the details of one particular superhero with all its information and images
 - Search superhero by name

## TechStack frontend

 - TypeScript
 - React
 - MaterialUI
 - Axios
 - React hook form

## TechStack backend

 - TypeScript
 - NestJS
 - MySQL
 - Prisma
 - Google Storage

## Run

1.  Clone project's repo: `git clone https://github.com/Stepan22-prog/superheroDB.git`
2.  Create MySQL database
3.  Go to backend folder: `cd ./superhero-back`
4.  Create an **.env** file and fill it in according to the example in **.env.example**
5.  Run: `npm install`
6.  Run: `npx prisma db push`
7.  To start the backend in dev mode run: `npm run start:dev`
8.  Go to frontend folder: `cd ../superhero-front`
9.  Create an **.env** file and fill it in according to the example in **.env.example**
10.  Run: `npm install`
11.  To start the frontend in dev mode run: `npm run dev`

## Visit website

https://extraordinary-pegasus-d7770e.netlify.app