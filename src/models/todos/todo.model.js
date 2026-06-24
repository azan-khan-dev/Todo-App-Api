import getPool from "../../config/db_connect";

async function createTodo(userId, title, description, priority, dueDate) {
  const pool = getPool();

  const query = `
    INSERT INTO todos (user_id, title, description, priority, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const result = await pool.query(query, [
    userId,
    title,
    description,
    priority,
    dueDate,
  ]);

  return result.rows[0];
}
// GET ALL TODOS OF A USER

async function getTodosByUserId(userId) {
  const pool = getPool();
  const query = `
    SELECT * FROM todos
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

//UPDATE A TODO
async function UpdateTodo(
  id,
  userId,
  title,
  description,
  priority,
  dueDate,
  IsComplete,
) {
  const pool = getPool();
  const query = `UPDATE todos SET title=$1,description=$2,priority=$3,due_date=$4,is_completed=$5,updated_at=NOW()
  WHERE id=$6 AND user_id=$7
  RETURNING *`;

   const result = await pool.query(query, [
    title,
    description,
    priority,
    dueDate,
    isCompleted,
    id,
    userId,
  ]);
  return result.rows[0];
}


async function toggleTodoStatus(id, userId) {
  const pool = getPool();

  const query = `
    UPDATE todos
    SET is_completed = NOT is_completed,
        updated_at = NOW()
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  const result = await pool.query(query, [id, userId]);

  return result.rows[0];
}

async function deleteTodo(id, userId) {
  const pool = getPool();

  
  const query = `
    DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *
  `;

  const result = await pool.query(query, [id, userId]);

  return result.rows[0];
}
async function getTodoById(id, userId) {
  const pool = getPool();

  
  const query = `
    SELECT * FROM todos WHERE id = $1 AND user_id = $2
  `;

  const result = await pool.query(query, [id, userId]);

  return result.rows[0];
}
export {
  createTodo,
  getTodosByUserId,
  getTodoById,
  UpdateTodo,
  toggleTodoStatus,
  deleteTodo
  
};