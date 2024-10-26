# TalentMap
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Demo Video
Demo video of how to use the application can be found [here](https://github.com/keithrsialana/TalentMap)

## Table of Contents
- [Description](#Description)
- [Installation](#Installation-Instructions)
- [Usage](#Usage-Instructions)
- [Credits](#Credits)
- [License](#License)
- [Features](#Features)
- [Questions](#Questions)

## Description
The goal of this project is to apply knowledge of using Node.js modules to manage a database hosted locally. This specific project manages a database called `employee_tracker_db` with three tables (department, role, employee). The user will be able to navigate through a set of menu options to view, add, and update employees in the database.

## Requirements
- [PostgreSQL](https://www.postgresql.org/download/) installed on your computer
- Update your System Environment variables to include `psql` as a command prompt command.
    - Instructions on how to do this can be found [here](https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools/)
- [Node.js](https://nodejs.org/en/download/prebuilt-installer/current) installed on your computer

## Installation Instructions
1. Navigate to the `db` folder using `cd db` in the terminal.
2. Launch `psql` in the terminal. Default: `psql -U postgres`
3. Populate your local database by typing `\i schema.sql`
4. Exit `psql` with `exit`
5. Navigate back to the main folder with `cd ../`
6. Install required dependencies with `npm i`

## Usage Instructions
1. In a terminal from within the project folder, launch the application using `npm run start`.
2. Use the arrow keys to navigate the application and type when prompted.

## Credits
Keith Sialana

## License
MIT

## Features
- View all records for each table
- Add new records for each table
- Update the role of an existing employee

## Questions
- [GitHub](https://github.com/keithrsialana)
- [Email](mailto:keith.sialana@hotmail.com)
