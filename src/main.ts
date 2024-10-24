import { connectToDb } from './connection.ts';
import { inquirer } from 'inquirer';
import departmentService from './service/departmentService.ts';

await connectToDb();

// function to start the application
const startApplication = async () => {
    const menu = [
        {
            type: 'list',
            name: 'action',
            message: 'Please choose an option:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Exit'
            ]
        }
    ];

    // prompt the user
    const { action } = await inquirer.prompt(menu);

    // handle the user choice
    switch (action) {
        case 'View All Departments':
            viewDepartments();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add A Department':
            addDepartment();
            break;
        case 'Add A Role':
            addRole();
            break;
        case 'Add An Employee':
            addEmployee();
            break;
        case 'Update An Employee Role':
            updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Exiting...');
            process.exit();
    }
};

// placeholder functions for each action
const viewDepartments = () => {
    console.log('Viewing all departments...');
    const departments = departmentService.getDepartments();
    console.table(departments);
    startApplication();  // return to main menu
};

const viewDepartmentByName = (name:string) => {
    const department = departmentService.getDepartmentByName(name);
    console.table(department);
    startApplication();  // return to main menu
}

const viewRoles = () => {
    console.log('Viewing all roles...');
    // TODO: call function to fetch and display roles
    startApplication();  // return to main menu
};

const viewEmployees = () => {
    console.log('Viewing all employees...');
    // TODO: call function to fetch and display employees
    startApplication();  // return to main menu
};

const addDepartment = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:'
    });
    console.log(`Adding department: ${departmentName}...`);
    // TODO: call function to add department
    startApplication();  // return to main menu
};

const addRole = async () => {
    const { roleName, salary } = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the name of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the new role:'
        }
    ]);
    console.log(`Adding role: ${roleName} with salary: ${salary}...`);
    // TODO: call function to add role
    startApplication();  // return to main menu
};

const addEmployee = async () => {
    const { firstName, lastName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee:'
        }
    ]);
    console.log(`Adding employee: ${firstName} ${lastName}...`);
    // TODO: call function to add employee
    startApplication();  // return to main menu
};

const updateEmployeeRole = async () => {
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee to update:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID:'
        }
    ]);
    console.log(`Updating employee ID ${employeeId} to role ID ${newRoleId}...`);
    // TODO: call function to update employee role
    startApplication();  // return to main menu
};

// start the application
startApplication();
