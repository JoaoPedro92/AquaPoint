import { pool } from "../db.js";

export async function listAquaPoints(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ap.*,
        ps.*,
        AVG(r.rating) AS ratingAVG,
        COUNT(r.id) AS ratingsAmount
      FROM aqua_points ap
      INNER JOIN points_state ps 
        ON ap.id = ps.point_id
      LEFT JOIN reviews r 
        ON ap.id = r.point_id
      GROUP BY ap.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getAquaPointById(req, res) {
  const id = Number(req.params.id);

  try {
    const [rows] = await pool.query(`
      SELECT 
        ap.*,
        ps.*,
        AVG(r.rating) AS ratingAVG,
        COUNT(r.id) AS ratingsAmount
      FROM aqua_points ap
      INNER JOIN points_state ps 
        ON ap.id = ps.point_id
      LEFT JOIN reviews r 
        ON ap.id = r.point_id
      WHERE ap.id = ?
      GROUP BY ap.id
    `, [id]);

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}