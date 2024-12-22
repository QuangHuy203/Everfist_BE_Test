# Everfist_BE_Test

# Prerequisites

Run the following command to install dependencies:
npm install

# Environment variables

This project depends on some environment variables. If you are running this project locally, create a .env file at the root for these variables.
NODE_ENV

# Apply any SQL migration script

Run the following command to create/update your database based on existing sql migration scripts:
npm run migrate

# Seed the database

The project includes a seed script to populate the database:
npm run seed
(You can edit file 20241222133220-metric-values.js at line 15 to generate more data)

# Run the project

Run the following command to run the project:
npm run start
