import { pool } from "../db.js";
import { findUserById } from "./user.controller.js";
import { findFavoritesByUserId } from "./favorites.controller.js";


// GET /aquapoints
export async function getAllAquapoints(req, res) {
  try {
    const [rows] = await returnAllAquapoints();
    res.json(rows.map(formatPoints));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// GET /aquapoints/{id}
export async function getAquaPointById(req, res) {
  const id = Number(req.params.id);

  try {
    /*const [rows] = await pool.query(`
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
    `, [id]);*/

    const findAquapoint = await findAquapointById(id);
    if(!findAquapoint) return res.status(404).json({ error: `Aquapoint with ID: ${id} not found`});

    res.json(findAquapoint.map(formatPoints));
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
}

// GET /aquapoints/user/{id}/favorites
export async function getUserFavoritePoints(req, res){
  try{
    const userId = Number(req.params.id)
    const findUser = await findUserById(userId)
    if(!findUser) return res.status(404).json({ error: `User with ID: ${userId} not found`});

    const favoriteUserPoints = await findFavoritesByUserId(findUser.id)
    const favoriteAquapoints = await Promise.all(
      favoriteUserPoints.map((point) => findAquapointById(point.point_id))
    )

    res.json(favoriteAquapoints.map(formatPoints))
  }
  catch(err){
    res.status(500).json({ error: err.message })  
  }
}

// GET /aquapoints/pending-points
export async function getPendingPoints(req, res){
  try{
    
    const [rows] = await returnAllAquapoints()
    const pendingPoints = rows.filter(ap => ap.state_id === 3);

    res.json(pendingPoints.map(formatPoints))
  }
  catch(err){
    res.status(500).json({ error: err.message })  
  }
}

// GET /aquapoints/pending-points-count
export async function getCountPendingAquapoints(req, res){
  try{
    const [rows] = await pool.query(
      `SELECT count(*) as total_pending FROM aqua_points WHERE state_id = 3`
    )
    res.json(rows[0])
  }
  catch(err){
    res.status(500).json({ error: err.message })
  }
}

// POST /aquapoints
export async function createAquapoint(req, res){
  const { point_name, image, point_type, point_trust, local_id, state_id, latitude, longitude } = req.body;

  if(!point_name || !image || !point_type || !point_trust || !local_id || !state_id || !latitude || !longitude){
    return res.status(400).json({ error: 'All fields are required' })
  }

  let aquaPointPictureBlob = null

  if (typeof image === 'string' && image.startsWith('data:image/')) {
    aquaPointPictureBlob = Buffer.from(image.split(',')[1], 'base64')
  }

  try{
    const[result] = await pool.query(
      'INSERT INTO aqua_points (point_name, image, point_type, point_trust, local_id, state_id, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [point_name, aquaPointPictureBlob, point_type, point_trust, local_id, state_id, latitude, longitude]
    )

    res.status(201).json({ message: 'Aquapoint created successfully' })
  }
  catch(err){
    return res.status(500).json({ error: err.message })
  }
}

// PUT /aquapoints/{id}
export async function updateAquapoint(req, res) {

  try{
    const id = Number(req.params.id)
    const findAquapoint = await findAquapointById(id)

    if(!findAquapoint) return res.status(404).json({ error: `Aquapoint not found with id ${id}`})
    
    //const { point_name, point_type, point_trust, local_id, state_id, image, latitude, longitude } = req.body
    const point_name = req.body.point_name ?? findAquapoint.point_name;
    const point_type = req.body.point_type ?? findAquapoint.point_type;
    const point_trust = req.body.point_trust ?? findAquapoint.point_trust;
    const local_id = req.body.local_id ?? findAquapoint.local_id;
    const state_id = req.body.state_id ?? findAquapoint.state_id;
    const image = req.body.image ?? findAquapoint.image;
    const latitude = req.body.latitude ?? findAquapoint.latitude;
    const longitude = req.body.longitude ?? findAquapoint.longitude;

    if(!point_name || !point_type || !point_trust || !local_id || !state_id || !latitude || !longitude || !image){
      return res.status(400).json({ error: 'All fields are required' })
    }

    let aquaPointPictureBlob = null

    if (typeof image === 'string' && image.startsWith('data:image/')) {
      aquaPointPictureBlob = Buffer.from(image.split(',')[1], 'base64')
    }

    const[result] = await pool.query(
      'UPDATE aqua_points set point_name = ?, point_type = ?, point_trust = ?, local_id = ?, state_id = ?, image = ?, latitude = ?, longitude = ? WHERE id = ?',
      [point_name, point_type, point_trust, local_id, state_id, aquaPointPictureBlob, latitude, longitude, findAquapoint.id]
    )

    if(result.affectedRows === 0) return res.status(500).json({ error: `There was a problem updating the aquapoint with ID: ${findAquapoint.id}`})

    res.json({ message: `Aquapoint '${point_name}' updated successfully` })
 
  }
  catch(err){
    res.status(500).json({ error: err.message })
  }
}

// PUT /aquapoints/change-state/{id}
export async function changeAquapointState(req, res){
  try{
    const id = Number(req.params.id)
    const findAquapoint = await findAquapointById(id)
    if(!findAquapoint) return res.status(404).json({ error: `Aquapoint not found with id ${id}`})
    
    const state_id = req.body

    const[result] = await pool.query(
      'UPDATE aqua_points set state_id = ? WHERE id = ?',
      [state_id, findAquapoint.id]
    )

    if(result.affectedRows === 0) return res.status(500).json({ error: `There was a problem updating the aquapoint with ID: ${findAquapoint.id}`})

    res.json({ message: `Aquapoint '${point_name}' updated successfully` })
  }
  catch(err){
    res.status(500).json({ error: err.message })
  }
}

// DELETE /aquapoints/{id}
export async function deleteAquapoint(req, res){

  try{
    const id = Number(req.params.id)
    const findAquapoint = await findAquapointById(id)
    if(!findAquapoint) return res.status(404).json({ error: `Aquapoint not found with id ${id}`})
    
    await pool.query('DELETE FROM aqua_points WHERE id = ?', findAquapoint.id)

    res.json({ message: `Aquapoint '${findAquapoint.point_name}' was deleted successfully` })
  }
  catch(err){
    res.status(500).json({ error: err.message })
  }
}

// returns all fields inner joining names of references by ID's
async function returnAllAquapoints(){
  return await pool.query(`
      SELECT 
        ap.*,
        s.state_name,
        t.type_name,
        l.local_name,
        z.zone_name,
        trust.trust_name,
        ROUND(AVG(r.rating), 1) AS ratingAVG,
        COUNT(r.id) AS ratingsAmount
      FROM aqua_points ap
      INNER JOIN states s
        ON ap.state_id = s.id
      INNER JOIN type t
        ON ap.point_type = t.id
      INNER join local l
        ON ap.local_id = l.id
      INNER join zone z
        ON l.zone_id = z.id
      INNER join trustlevels trust
        ON trust.id = ap.point_trust
      LEFT JOIN reviews r 
        ON ap.id = r.point_id
      GROUP BY ap.id
    `);
}

// returns all fields inner joining names of references by ID's
async function findAquapointById(id){
  const [rows] = await pool.query(`
    SELECT 
        ap.*,
        s.state_name,
        t.type_name,
        l.local_name,
        z.zone_name,
        trust.trust_name,
        ROUND(AVG(r.rating), 1) AS ratingAVG,
        COUNT(r.id) AS ratingsAmount
      FROM aqua_points ap
      LEFT JOIN states s
        ON ap.state_id = s.id
      INNER JOIN type t
        ON ap.point_type = t.id
      INNER join local l
        ON ap.local_id = l.id
      INNER join zone z
        ON l.zone_id = z.id
      INNER join trustlevels trust
        ON trust.id = ap.point_trust
      LEFT JOIN reviews r 
        ON ap.id = r.point_id
      WHERE ap.id = ?
      GROUP BY ap.id
      `, [id]      
  );

  return rows[0];
}

export function formatPoints(aquaPoint){
  if(aquaPoint.image){
    aquaPoint.image = `data:image/jpeg;base64,${aquaPoint.image.toString('base64')}`
  }

  return aquaPoint
}