import getPool from "../../config/db_connect.js";


//Create user model
async function create_user(name,email,hashPassword){
    const pool=getPool();
    const query=`INSERT INTO users(name,email,password)
    VALUES ($1,$2,$3)
    RETURNING id,name,email,created_at`;
    const result=await pool.query(query,[name,email,hashPassword])
     return result.rows[0];

}

// Find User 
async function FindUserByEmail(email)
{
    const pool = getPool()
    const result=await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    return result.rows[0];

}
//find by USER ID
async function FindUserById(id){
    const pool=getPool();
     const result = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [id]
  );

  return result.rows[0];
}
export {create_user,FindUserByEmail,FindUserById};