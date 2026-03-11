import { pool } from "../db.js"

// Get all reviews
export async function getAllReviews(req, res){
try {
  const [rows] = await pool.query("SELECT * FROM reviews")
  res.json(rows)
} catch (err) {
  console.error(err)
  res.status(500).json({
    error: err.message
  })
}
}

// get reviews by id
export async function getReviewById(req, res){
  try {
    const [rows] = await pool.query(
      "SELECT * FROM reviews WHERE id = ?",
      [req.params.id]
    )

    if(rows.length === 0){
      return res.satus(404).json({
        error: "Review not found"
      })
    }

    res.json(rows[0])

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}


// get reviews by user
export async function getReviewsByUserId(req,res){

  const id = Number(req.params.id)

  try{

    const reviews = await findReviewsByUserId(id)

    if(!reviews.length){
      return res.status(404).json({
        error:`No reviews found for user ${id}`
      })
    }
    res.json(reviews)
  }
  catch(err){
    res.status(500).json(err.message)
  }

}

// get a aquapoint reviews by aquapoint id
export async function getReviewsByPointId(req,res){
  const id = Number(req.params.id)

  try{
    const reviews = await findReviewsByAquapointId(id)

    if(!reviews.length){
      return res.status(404).json({
        error:`No reviews found for aquapoint ${id}`
      })
    }

    res.json(reviews)
  }
  catch(err){
    res.status(500).json(err.message)
  }

}

// post - create reviews
export async function createReview(req, res){
  const {user_id, rating, comment, point_id } = req.body

  if(!user_id || !rating || !comment || !point_id){
    return res.status(400).json({
      error: "All fields are required"
    })
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO reviews (user_id, rating, comment, point_id, createdAt) VALUES (?, ?, ?, ?, NOW())`,
      [user_id, rating, comment, point_id]
    )

    res.status(201).json({
      message:"Review created sucessfully",
      id: result.insertId
    })

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

// update review
export async function updateReview(req,res){
  const id = Number(req.params.id)
  const {rating,comment} = req.body

  try{
    const review = await findReviewById(id)

    if(!review){
      return res.status(404).json({error:`Review not found`})
    }

    await pool.query(
      `UPDATE reviews SET rating = ?, comment = ? WHERE id = ?`,
      [rating,comment,id]
    )

    res.json({
      message:`Review ${id} updated successfully`
    })
  }
  catch(err){
    res.status(500).json(err.message)
  }

}

//delete review 
export async function deleteReview(req,res){
  const id = Number(req.params.id)

  try{
    const review = await findReviewById(id)

    if(!review){
      return res.status(404).json({error:`Review not found`})
    }

    await pool.query(`DELETE FROM reviews WHERE id = ?`,[id])

    res.json({
      message:`Review ${id} deleted successfully`
    })
  }
  catch(err){
    res.status(500).json(err.message)
  }
}


async function findReviewsByUserId(id){

  const [rows] = await pool.query(`
    SELECT *
    FROM reviews
    WHERE user_id = ?
  `,[id])

  return rows
}

async function findReviewsByAquapointId(id){

  const [rows] = await pool.query(`
    SELECT *
    FROM reviews
    WHERE point_id = ?
  `,[id])

  return rows
}

async function findReviewById(id){

  const [rows] = await pool.query(`
    SELECT *
    FROM reviews
    WHERE id = ?
  `,[id])

  return rows[0]
}


