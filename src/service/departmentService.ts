import { pool } from "../connection.js";
export class Department {
	id: number;
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

class DepartmentService {
    
    async createDepartment(name: string) {
        try {
            await pool.query("INSERT INTO department (name) VALUES ($1)",[name]);
            console.log(`New department ${name} was successfully created`);
        } catch (err) {
            console.error(`[ERROR] CreateDepartment query failed: ${err}`);
            throw new Error("[ERROR] CreateDepartment query did not get a response from the database");
        }
    }

    async getDepartmentById(id: number): Promise<Department | null> {
        try {
            const res = await pool.query("SELECT * FROM department WHERE id=$1", [id]);
            return res.rows[0] || null; // return the department object or null if not found
        } catch (err) {
            console.error(`[ERROR] DepartmentById query failed: ${err}`);
            throw new Error('[ERROR] DepartmentById query did not get a response from the database');
        }
    }
    async getDepartmentByName(name: string): Promise<Department | null> {
        try {
            const res = await pool.query("SELECT * FROM department WHERE name=$1", [name]);
            return res.rows[0] || null; // return the department object or null if not found
        } catch (err) {
            console.error(`[ERROR] DepartmentByName query failed: ${err}`);
            throw new Error(`[ERROR] DepartmentByName query did not get a response from the database`);
        }
    }
    async getDepartments(): Promise<any[]> {
        try {
            const res = await pool.query("SELECT * FROM department");
            return res.rows; // return the list of departments
        } catch (err) {
            console.error(`[ERROR] Departments query failed: ${err}`);
            throw new Error("[ERROR] Departments query did not get a response from the database");
        }
    }
}

export default new DepartmentService();
