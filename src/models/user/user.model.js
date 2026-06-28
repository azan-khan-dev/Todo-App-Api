import getPool from "../../config/db_connect.js";

//Create user model
async function create_user(name, email, hashPassword) {
  const pool = getPool();
  const query = `INSERT INTO users(name,email,password)
    VALUES ($1,$2,$3)
    RETURNING id,name,email,created_at`;
  const result = await pool.query(query, [name, email, hashPassword]);
  return result.rows[0];
}
async function UpdateRefreshToken(userId, refreshToken) {
  const pool = getPool();

  const result = await pool.query(
    `UPDATE users
     SET refresh_token = $1
     WHERE id = $2
     RETURNING id`,
    [refreshToken, userId],
  );

  return result.rows[0];
}

async function RemoveRefreshToken(userId) {
  const pool = getPool();

  const result = await pool.query(
    `
    UPDATE users
    SET refresh_token = NULL
    WHERE id = $1
    RETURNING id
    `,
    [userId]
  );

  return result.rows[0];
}


async function FindUserByRefreshToken(refreshToken) {
  const pool = getPool();

  const result = await pool.query(
    `SELECT * FROM users
     WHERE refresh_token = $1`,
    [refreshToken],
  );

  return result.rows[0];
}

// Find User
async function FindUserByEmail(email) {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
}
//find by USER ID
async function FindUserById(id) {
  const pool = getPool();
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0];
}
export { create_user, FindUserByEmail, FindUserById, UpdateRefreshToken,FindUserByRefreshToken, RemoveRefreshToken };
