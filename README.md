# Tabletopr
Tabletopr-Groupfinder is an app that connects tabletop RPG hosts with potential players.

[tabletopr-groupfinder.herokuapp.com](https://tabletopr-groupfinder.herokuapp.com/)

## Built With
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [React-Redux](https://react-redux.js.org/)

## Prerequisites
* Node.js
* Node Package Manager (NPM)
* PostgreSQL

## Installation
1. Clone the repo:<br />
`git clone https://github.com/martinson-r/Tabletopr.git`
1. cd to the root project directory and npm install:<br />
`npm install`
1. cd into the frontend and backend folders, respectively, and npm install
1. Log into PostGreSQL and create a user with a secure password and database creation privileges:<br />
`create user tabletopr_app with password *a secure password of your choice* createdb`
1. Following the .env.example file, create a .env file with your chosen username, password, and a database name (such as tabletopr)
1. Generate a JWT secret key using the Node repl<br />
`node`<br />
`require("crypto").randomBytes(32).toString("hex");`<br />
`.exit`<br />
1. Create the database:<br />
`npx dotenv sequelize db:migrate`
1. Seed the database:<br />
`npx dotenv sequelize db:seed:all`
1. Open separate terminals and start the front end and back end (you must start them both):<br />
`npm start`
1. Navigate to localhost:3000

## Contact
Rihana Martinson - martinson.r@gmail.com
Project Link - https://github.com/martinson-r/Tabletopr
