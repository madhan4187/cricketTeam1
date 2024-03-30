const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null
const initiziseDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initiziseDbAndServer()

app.get('/players/', async (request, response) => {
  const getPlayersQuery = `SELECT *
  FROM cricket_team
  ORDER BY player_id`
  const players = await db.all(getPlayersQuery)
  response.send(players)
})

app.get('/players/:playerId/', async (request, response) => {
  const {playerID} = request.params
  const getPlayerQuery = `SELECT *
  FROM cricket_team
  WHERE player_id = ${playerID};`
  const player = await db.get(getPlayerQuery)
  response.send(player)
})
