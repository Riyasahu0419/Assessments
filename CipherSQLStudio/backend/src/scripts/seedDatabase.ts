import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Assignment } from '../models/Assignment';

dotenv.config();

const sampleAssignments = [
  {
    title: 'Basic SELECT Query',
    description: 'Learn to retrieve data from a single table',
    difficulty: 'easy',
    category: 'basics',
    question: 'Write a query to select all employees from the employees table.',
    requirements: ['Select all columns', 'Return all rows'],
    tables: [
      {
        name: 'employees',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
          {
            name: 'department_id',
            type: 'INTEGER',
            nullable: true,
            primaryKey: false,
            foreignKey: { table: 'departments', column: 'id' },
          },
          { name: 'salary', type: 'DECIMAL(10,2)', nullable: true, primaryKey: false },
          { name: 'hire_date', type: 'DATE', nullable: true, primaryKey: false },
        ],
      },
    ],
    sampleData: {
      employees: [
        { id: 1, name: 'Alice Johnson', department_id: 1, salary: 95000, hire_date: '2020-01-15' },
        { id: 2, name: 'Bob Smith', department_id: 1, salary: 85000, hire_date: '2021-03-20' },
        { id: 3, name: 'Carol White', department_id: 2, salary: 75000, hire_date: '2019-06-10' },
        { id: 4, name: 'David Brown', department_id: 2, salary: 80000, hire_date: '2020-11-05' },
        { id: 5, name: 'Eve Davis', department_id: 3, salary: 70000, hire_date: '2022-02-14' },
      ],
    },
    solutionQuery: 'SELECT * FROM employees;',
    hints: [
      'Use the SELECT keyword to retrieve data',
      'Use * to select all columns',
      "Don't forget the FROM clause to specify the table",
    ],
    estimatedTime: 5,
  },
  {
    title: 'Filtering with WHERE',
    description: 'Learn to filter data using WHERE clause',
    difficulty: 'easy',
    category: 'basics',
    question: 'Write a query to find all employees with a salary greater than 80000.',
    requirements: ['Use WHERE clause', 'Filter by salary', 'Return all matching rows'],
    tables: [
      {
        name: 'employees',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
          {
            name: 'department_id',
            type: 'INTEGER',
            nullable: true,
            primaryKey: false,
            foreignKey: { table: 'departments', column: 'id' },
          },
          { name: 'salary', type: 'DECIMAL(10,2)', nullable: true, primaryKey: false },
          { name: 'hire_date', type: 'DATE', nullable: true, primaryKey: false },
        ],
      },
    ],
    sampleData: {
      employees: [
        { id: 1, name: 'Alice Johnson', department_id: 1, salary: 95000, hire_date: '2020-01-15' },
        { id: 2, name: 'Bob Smith', department_id: 1, salary: 85000, hire_date: '2021-03-20' },
        { id: 3, name: 'Carol White', department_id: 2, salary: 75000, hire_date: '2019-06-10' },
        { id: 4, name: 'David Brown', department_id: 2, salary: 80000, hire_date: '2020-11-05' },
        { id: 5, name: 'Eve Davis', department_id: 3, salary: 70000, hire_date: '2022-02-14' },
      ],
    },
    solutionQuery: 'SELECT * FROM employees WHERE salary > 80000;',
    hints: [
      'Use the WHERE clause to filter rows',
      'Use the > operator for greater than comparison',
      'Salary is a numeric column, no quotes needed',
    ],
    estimatedTime: 10,
  },
  {
    title: 'JOIN Two Tables',
    description: 'Learn to combine data from multiple tables',
    difficulty: 'medium',
    category: 'joins',
    question:
      'Write a query to show employee names along with their department names.',
    requirements: [
      'Join employees and departments tables',
      'Show employee name and department name',
      'Use appropriate JOIN type',
    ],
    tables: [
      {
        name: 'employees',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
          {
            name: 'department_id',
            type: 'INTEGER',
            nullable: true,
            primaryKey: false,
            foreignKey: { table: 'departments', column: 'id' },
          },
          { name: 'salary', type: 'DECIMAL(10,2)', nullable: true, primaryKey: false },
        ],
      },
      {
        name: 'departments',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
          { name: 'location', type: 'VARCHAR(100)', nullable: true, primaryKey: false },
        ],
      },
    ],
    sampleData: {
      employees: [
        { id: 1, name: 'Alice Johnson', department_id: 1, salary: 95000 },
        { id: 2, name: 'Bob Smith', department_id: 1, salary: 85000 },
        { id: 3, name: 'Carol White', department_id: 2, salary: 75000 },
      ],
      departments: [
        { id: 1, name: 'Engineering', location: 'San Francisco' },
        { id: 2, name: 'Sales', location: 'New York' },
        { id: 3, name: 'Marketing', location: 'Los Angeles' },
      ],
    },
    solutionQuery:
      'SELECT e.name AS employee_name, d.name AS department_name FROM employees e JOIN departments d ON e.department_id = d.id;',
    hints: [
      'Use JOIN to combine tables',
      'Match employees.department_id with departments.id',
      'Use table aliases (e, d) for cleaner syntax',
      'Use AS to rename columns in the output',
    ],
    estimatedTime: 15,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✓ Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('✓ Cleared existing assignments');

    // Insert sample assignments
    await Assignment.insertMany(sampleAssignments);
    console.log(`✓ Inserted ${sampleAssignments.length} sample assignments`);

    console.log('\n✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Database seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
