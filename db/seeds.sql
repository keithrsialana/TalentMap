-- Inserting into the 'department' table
INSERT INTO department (name) VALUES 
('HR'),
('Engineering'),
('Marketing'),
('Sales'),
('Finance');

-- Inserting into the 'role' table
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 70000, 1),
('Recruiter', 60000, 1),
('Software Engineer', 90000, 2),
('DevOps Engineer', 85000, 2),
('Marketing Specialist', 60000, 3),
('Sales Associate', 50000, 4),
('Accountant', 65000, 5);

-- Inserting into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL),   -- HR Manager
('Bob', 'Smith', 2, 1),          -- Recruiter, Manager: Alice
('Charlie', 'Brown', 3, NULL),   -- Software Engineer
('David', 'Wilson', 4, 3),       -- DevOps Engineer, Manager: Charlie
('Eve', 'Taylor', 5, NULL),      -- Marketing Specialist
('Frank', 'Anderson', 6, 5),     -- Sales Associate, Manager: Eve
('Grace', 'Thomas', 2, 1),       -- Recruiter, Manager: Alice
('Hank', 'White', 1, NULL),      -- HR Manager
('Ivy', 'King', 3, NULL),        -- Software Engineer
('Jack', 'Green', 4, 3),         -- DevOps Engineer, Manager: Charlie

('Kate', 'Hall', 1, 1),          -- HR Manager, Manager: Alice
('Liam', 'Clark', 2, 2),         -- Recruiter, Manager: Bob
('Mia', 'Lewis', 3, 5),          -- Marketing Specialist, Manager: Eve
('Noah', 'Young', 4, 4),         -- Sales Associate, Manager: Frank
('Olivia', 'Harris', 5, NULL),   -- Accountant, No manager
('Paul', 'Allen', 3, 3),         -- Software Engineer, Manager: Charlie
('Quinn', 'Scott', 4, 1),        -- Sales Associate, Manager: Alice
('Rachel', 'Wright', 2, 2),      -- Recruiter, Manager: Bob
('Steve', 'Martinez', 3, 4),     -- Software Engineer, Manager: David
('Tina', 'Garcia', 4, 5);        -- Sales Associate, Manager: Frank


\c postgres