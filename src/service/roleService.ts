import { pool } from "../connection.js";

export class Role {
	id: number;
	title: string;
	salary: number;
	department: number;

	constructor(id: number, title: string, salary: number, department: number) {
		this.id = id;
		this.title = title;
		this.salary = salary;
		this.department = department;
	}
}

export class RoleService {
	async createRole(
		title: string,
		salary: number,
		department: number | undefined
	    ): Promise<void> {
		try {
			await pool.query(
				"INSERT INTO role (title,salary,department_id) values($1,$2,$3)",
				[title, salary, department]
			);
			console.log(`Role ${title} has been successfully created`);
		} catch (err) {
			console.error(`[ERROR] CreateRole query failed: ${err}`);
			throw new Error(
				"[ERROR] CreateRole query did not get a response from the database"
			);
		}
	}
	async getRoleById(id: number): Promise<Role | null> {
		try {
			const res = await pool.query("SELECT * FROM role WHERE id=$1", [id]);
			return res.rows[0]
				? new Role(
						res.rows[0].id,
						res.rows[0].title,
						res.rows[0].salary,
						res.rows[0].department
				  )
				: null;
		} catch (err) {
			console.error(`[ERROR] GetRoleById query failed: ${err}`);
			throw new Error(
				"[ERROR] GetRoleById query did not get a response from the database"
			);
		}
	}

	async getRoleByTitle(title: string): Promise<Role | null> {
		try {
			const res = await pool.query("SELECT * FROM role WHERE title=$1", [
				title,
			]);
			return res.rows[0]
				? new Role(
						res.rows[0].id,
						res.rows[0].title,
						res.rows[0].salary,
						res.rows[0].department
				  )
				: null;
		} catch (err) {
			console.error(`[ERROR] GetRoleByTitle query failed: ${err}`);
			throw new Error(
				"[ERROR] GetRoleByTitle query did not get a response from the database"
			);
		}
	}

	async getRoles(): Promise<any[]> {
		try {
			const res = await pool.query(`SELECT r.id, r.title, r.salary, d.name AS department_name
            FROM role r
            JOIN department d ON r.department_id = d.id`);
			return res.rows;
		} catch (err) {
			console.error(`[ERROR] GetRoles query failed: ${err}`);
			throw new Error(
				"[ERROR] GetRoles query did not get a response from the database"
			);
		}
	}

	async getRoleByDepartment(name: string): Promise<Role[]> {
		try {
			// get the department ID by name
			const departmentRes = await pool.query(
				"SELECT id FROM department WHERE name=$1",
				[name]
			);
			const department = departmentRes.rows[0];

			if (!department) {
				console.error(`[ERROR] Department not found with name: ${name}`);
				throw new Error("[ERROR] Department not found");
			}

			// Get roles by department ID
			const res = await pool.query("SELECT * FROM role WHERE department=$1", [
				department.id,
			]);
			return res.rows.map(
				(row: any) => new Role(row.id, row.title, row.salary, row.department)
			); // return an array of Role instances
		} catch (err) {
			console.error(`[ERROR] GetRoleByDepartment query failed: ${err}`);
			throw new Error(
				"[ERROR] GetRoleByDepartment query did not get a response from the database"
			);
		}
	}
}

export default new RoleService();
