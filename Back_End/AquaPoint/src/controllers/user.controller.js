import { pool } from "../db.js";

export async function listUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users LIMIT 100");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getUserById(req, res) {
  const id = Number(req.params.id);

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}