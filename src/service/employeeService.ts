import { pool } from "../connection.js";
import roleService from "./roleService.js";

class Employee {
	id: number;
	first_name: string;
	last_name: string;
	role_id: number;
	manager_id: number;

	constructor(
		id: number,
		first_name: string,
		last_name: string,
		role_id: number,
		manager_id: number
	) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.role_id = role_id;
		this.manager_id = manager_id;
	}
}

class EmployeeService {
	async createEmployee(
		first_name: string,
		last_name: string,
		role_name: string,
		manager_name: string
	): Promise<void> {
		try {
			// splits the first name from the rest of the name
			const managerFullNameArray = manager_name.split(" ");

			// assuming some last names have separated words by space, put the rest of the name in lastNameArray
			const [managerFirstName, ...managerLastNameArray] = managerFullNameArray;

			// create complete string of last name
			const managerLastName = managerLastNameArray.join(" ");
			const managerResult = await pool.query(
				"SELECT * from employee WHERE first_name=$1 AND last_name=$2",
				[managerFirstName, managerLastName]
			);

			if (managerResult.rowCount != null && managerResult.rowCount > 0) {
				const role = await roleService.getRoleByTitle(role_name);
				if (role != null) {
					await pool.query(
						"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)",
						[first_name, last_name, role.id, managerResult.rows[0].id]
					);
				}
			}
		} catch (err) {
			throw new Error(
				`[ERROR] createEmployee query did not get a response from the database: ${err}`
			);
		}
	}

	async updateEmployee(full_name: string, roleName: string) {
		try {
			// splits the first name from the rest of the name
			const fullNameArray = full_name.split(" ");

			// assuming some last names have separated words by space, put the rest of the name in lastNameArray
			const [firstName, ...lastNameArray] = fullNameArray;

			// create complete string of last name
			const lastName = lastNameArray.join(" ");
			const employeeResult = await pool.query(
				"SELECT * from employee WHERE first_name=$1 AND last_name=$2",
				[firstName, lastName]
			);

			if (employeeResult.rowCount != null && employeeResult.rowCount > 0) {
				const role: any = roleService.getRoleByTitle(roleName);
				if (role != null) {
					const employee = employeeResult.rows[0];
					await pool.query("UPDATE employee SET role_id=$1 WHERE id=$2", [
						role.id,
						employee.id,
					]);
				}
			}
		} catch (err) {
			throw new Error(
				`[ERROR] UpdateEmployee query did not get a response from the database: ${err}`
			);
		}
	}

	async getEmployeeById(id: number): Promise<Employee | null> {
		try {
			const result = await pool.query("SELECT * FROM employee WHERE id=$1", [
				id,
			]);
			if (result.rows.length > 0) {
				return result.rows[0]; // assuming the database returns an Employee object
			} else {
				throw new Error(`Employee with ID ${id} not found.`);
				return null;
			}
		} catch (err) {
			throw new Error(
				`[ERROR] EmployeeById query did not get a response from the database: ${err}`
			);
		}
	}

	async getEmployeeByRoleId(role_id: number): Promise<Employee[]> {
		try {
			const result = await pool.query(
				"SELECT * FROM employee WHERE role_id=$1",
				[role_id]
			);
			if (result.rows.length > 0) {
				return result.rows; // return array of Employee objects for the specified role
			} else {
				throw new Error(`No employees found for role ID ${role_id}.`);
				return []; // return an empty array if no employees are found
			}
		} catch (err) {
			throw new Error(
				`[ERROR] getEmployeeByRoleId query did not get a response from the database: ${err}`
			);
			return []; // return an empty array on error
		}
	}

	async getEmployeesByManagerId(manager_id: number): Promise<Employee[]> {
		try {
			const result = await pool.query(
				"SELECT * FROM employee WHERE manager_id=$1",
				[manager_id]
			);
			if (result.rows.length > 0) {
				return result.rows; // return array of Employee objects for the specified manager
			} else {
				console.error(`No employees found for manager ID ${manager_id}.`);
				return []; // return an empty array if no employees are found
			}
		} catch (err) {
			throw new Error(
				`[ERROR] getEmployeesByManagerId query did not get a response from the database: ${err}`
			);
			return []; // return an empty array on error
		}
	}

	async getEmployeesbyFullName(full_name: string): Promise<Employee[]> {
		try {
			// splits the first name from the rest of the name
			const fullNameArray = full_name.split(" ");

			// assuming some last names have separated words by space, put the rest of the name in lastNameArray
			const [firstName, ...lastNameArray] = fullNameArray;

			// create complete string of last name
			const lastName = lastNameArray.join(" ");

			const result = await pool.query(
				"SELECT * FROM employee WHERE first_name=$1 AND last_name=$2",
				[firstName, lastName]
			);

			return result.rows[0];
		} catch (err) {
			throw new Error(
				`[ERROR] getEmployeesbyFullName query did not get a response from the database: ${err}`
			);
			return []; // return an empty array on error
		}
	}

	async getEmployeesByFirstName(first_name: string): Promise<Employee[]> {
		try {
			const result = await pool.query(
				"SELECT * FROM employee WHERE first_name=$1",
				[first_name]
			);
			if (result.rows.length > 0) {
				return result.rows; // return array of Employee objects for the specified first name
			} else {
				console.error(`No employees found with first name "${first_name}".`);
				return []; // return an empty array if no employees are found
			}
		} catch (err) {
			throw new Error(
				`[ERROR] getEmployeesByFirstName query did not get a response from the database: ${err}`
			);
			return []; // return an empty array on error
		}
	}

	async getEmployeesByLastName(last_name: string): Promise<Employee[]> {
		try {
			const result = await pool.query(
				"SELECT * FROM employee WHERE last_name=$1",
				[last_name]
			);
			if (result.rows.length > 0) {
				return result.rows; // return array of Employee objects for the specified last name
			} else {
				console.error(`No employees found with last name "${last_name}".`);
				return []; // return an empty array if no employees are found
			}
		} catch (err) {
			throw new Error(
				`[ERROR] getEmployeesByLastName query did not get a response from the database: ${err}`
			);
			return []; // return an empty array on error
		}
	}

	async getEmployees(): Promise<Employee[]> {
		try {
			const result = await pool.query("SELECT * FROM employee");
			return result.rows;
		} catch (err) {
			throw new Error(
				"[ERROR] Employees query did not get a response from the database: " +
					err
			);
		}
	}
}

export default new EmployeeService();
