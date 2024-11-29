const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "**********",
  port: 5432,
})



app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ mensaje: "Error en el servidor" })
})

app.get("/posts", async (req, res, next) => {
  console.log("Solicitud GET recibida")
  const result = await pool.query("SELECT * FROM posts")
  res.json(result.rows)
})

app.post("/posts", async (req, res, next) => {
  console.log("Solicitud POST recibida", req.body)
  const { titulo, img, descripcion } = req.body
  await pool.query(
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)",
    [titulo, img, descripcion]
  )
  res.status(201).send("Post agregado con éxito")
})



const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})