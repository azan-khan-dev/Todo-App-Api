import pkg from "pg";

const { Pool } = pkg;

let pool;

// lazy init (important fix)
const getPool = () => {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 5432,
    });
  }
  return pool;
};

// connection test
export const testConnection = async () => {
  try {
    const client = await getPool().connect();

    console.log("DB Connected Successfully ✅   Database name is:",process.env.DB_NAME);

    client.release();
    return true;

  } catch (error) {
    console.error("DB Connection Failed ❌");
    console.error("Message:", error.message);

    return false;
  }
};

export default getPool;