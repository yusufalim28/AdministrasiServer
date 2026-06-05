import mysql from 'mysql2/promise';

// You might have DATABASE_URL like: mysql://user:password@localhost:3306/dbname
// mysql2 can parse it directly, or you can use separate env vars.
const db = mysql.createPool({
  uri: process.env.DATABASE_URL, // e.g., "mysql://root:@localhost:3306/dbcompro_2388010010"
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;
