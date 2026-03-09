import { pool } from "../db.js";
import { findFavoritesByUserId } from "./favorites.controller.js";

// GET /users
export async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows.map(formatUser));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// GET /users/{id}
export async function getUserById(req, res) {
  const userId = Number(req.params.id);

  try {
    const findUser = await findUserById(userId);
    if(!findUser) return res.status(404).json({ error: `User with ID: ${userId} not found`});

    res.json(formatUser(findUser));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// GET /users/id/profile-picture
export async function getUserProfilePicture(req, res){
  return res.json(await returnUserProfilePicture(Number(req.params.id)))
}



// POST /users
export async function createUser(req, res) {
  const { name, email, passwordHash, isAdmin } = req.body

  if(!name || !email || !passwordHash || !isAdmin) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try{
    const[result] = await pool.query(
      'INSERT INTO users (name, email, passwordHash, isAdmin) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, isAdmin]
    )

    res.status(201).json({ message: 'User created successfully!', id: result.insertId})
  }
  catch(err){
    res.status(500).json({ error: err.message })
  }
}

// PUT /users/{id}  - Doesn't change password neither isAdmin (there is another endpoint to change those)
export async function updateUser(req, res) {
  const userId = Number(req.params.id)
  
  try{
    const findUser = await findUserById(userId)
    if(!findUser) return res.status(404).json({ error: "User not found" })

    const { name, email, profilePicture } = req.body
    let profilePictureBlob = null

    if(profilePicture){
      profilePictureBlob = Buffer.from(profilePicture.split(',')[1], 'base64')
    }

    const[result] = await pool.query(
      'UPDATE users SET name = ?, email = ?, profilePicture = ? WHERE id = ?',
      [name, email, profilePictureBlob, userId]
    );

    res.json({ message: `User with ID: ${userId} updated successfully` });
  }
  catch(err){
    console.log(err.message)
    res.status(500).json({ error: err.message })
  }
}

// PUT /users/{id}/change-isadmin
export async function changeIsAdmin(req, res) {
    const userId = Number(req.params.id)
    
    try{
      const findUser = await findUserById(userId)
      if(!findUser) return res.status(404).json({ error: "User not found" })
    
      const[result] = await pool.query(
      'UPDATE users SET isAdmin = ? WHERE id = ?',
      [req.body.isAdmin, userId]
    );
      
    res.json({ message: `User with ID: ${userId} updated successfully` });    
    }
    catch(err){
      res.status(500).json({ error: err.message })
    }
}

// DELETE /users/{id}
export async function deleteUser(req, res) { 
  
  try{
    const findUser = await findUserById(Number(req.params.id))

    if(!findUser) return res.status(404).json({ error: "User not found" })

    await pool.query('DELETE FROM users WHERE id = ?', [findUser.id]);

    res.json({ message: `User with ID: ${userId} was deleted successfully` });
  }
  catch(err){
    res.status(500).json({ error: err.message })  
  }
}


export async function findUserById(id){
  const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
}

export async function returnUserProfilePicture(id){
  const findUser = await findUserById(id)
  if(!findUser) return res.status(404).json({ error: 'User not found'})
  
  return `data:image/jpeg;base64,${findUser.profilePicture.toString('base64')}`
}

export function formatUser(user){
  if(user.profilePicture){
    user.profilePicture = `data:image/jpeg;base64,${user.profilePicture.toString('base64')}`
  }

  return user
}


