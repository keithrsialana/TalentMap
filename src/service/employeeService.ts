import { QueryResult } from "pg";
import { pool } from "../connection";

class Employee{
    id:number;
    first_name:string;
    last_name:string;
    role_id:number;
    manager_id:number;

    constructor(id: number, first_name: string, last_name: string, role_id: number, manager_id: number) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}

class EmployeeService {
    employeeList: Employee[] = [];

    async getEmployeeById(id: number): Promise<Employee | null> {
        try {
            const result = await pool.query("SELECT * FROM employee WHERE id=$1", [id]);
            if (result.rows.length > 0) {
                return result.rows[0]; // assuming the database returns an Employee object
            } else {
                console.error(`Employee with ID ${id} not found.`);
                return null;
            }
        } catch (err) {
            throw new Error(`[ERROR] EmployeeById query did not get a response from the database: ${err}`);
        }
    }

    async getEmployeeByRoleId(role_id: number): Promise<Employee[]> {
        try {
            const result = await pool.query("SELECT * FROM employee WHERE role_id=$1", [role_id]);
            if (result.rows.length > 0) {
                return result.rows; // return array of Employee objects for the specified role
            } else {
                console.error(`No employees found for role ID ${role_id}.`);
                return []; // return an empty array if no employees are found
            }
        } catch (err) {
            console.error(`[ERROR] getEmployeeByRoleId query did not get a response from the database: ${err}`);
            return []; // return an empty array on error
        }
    }

    async getEmployeesByManagerId(manager_id: number): Promise<Employee[]> {
        try {
            const result = await pool.query("SELECT * FROM employee WHERE manager_id=$1", [manager_id]);
            if (result.rows.length > 0) {
                return result.rows; // return array of Employee objects for the specified manager
            } else {
                console.error(`No employees found for manager ID ${manager_id}.`);
                return []; // return an empty array if no employees are found
            }
        } catch (err) {
            console.error(`[ERROR] getEmployeesByManagerId query did not get a response from the database: ${err}`);
            return []; // return an empty array on error
        }
    }

    async getEmployeesByFirstName(first_name: string): Promise<Employee[]> {
        try {
            const result = await pool.query("SELECT * FROM employee WHERE first_name=$1", [first_name]);
            if (result.rows.length > 0) {
                return result.rows; // return array of Employee objects for the specified first name
            } else {
                console.error(`No employees found with first name "${first_name}".`);
                return []; // return an empty array if no employees are found
            }
        } catch (err) {
            console.error(`[ERROR] getEmployeesByFirstName query did not get a response from the database: ${err}`);
            return []; // return an empty array on error
        }
    }

    async getEmployeesByLastName(last_name: string): Promise<Employee[]> {
        try {
            const result = await pool.query("SELECT * FROM employee WHERE last_name=$1", [last_name]);
            if (result.rows.length > 0) {
                return result.rows; // return array of Employee objects for the specified last name
            } else {
                console.error(`No employees found with last name "${last_name}".`);
                return []; // return an empty array if no employees are found
            }
        } catch (err) {
            console.error(`[ERROR] getEmployeesByLastName query did not get a response from the database: ${err}`);
            return []; // return an empty array on error
        }
    }

    async getEmployees(): Promise<Employee[]> {
        try {
            const result = await pool.query("SELECT * FROM employee");
            this.employeeList = result.rows; // rssuming the database returns an array of Employee objects
            return this.employeeList;
        } catch (err) {
            console.error("[ERROR] Employees query did not get a response from the database: " + err);
            return []; // return an empty array on error
        }
    }
}