import pg, { PoolConfig } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check if all required environment variables are set
const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const host = process.env.PGHOST;
const port = process.env.PGPORT;
const database = process.env.PGDATABASE;

const { Pool } = pg;

// Pool config
// - Use environment variables to connect to the database
const poolConfig: PoolConfig = {
  user,
  password,
  host,
  port: Number(port),
  database,
};

// Create a pool of connections to the database
const pool = new Pool(poolConfig);

export default pool;
