import app from './app.js'
import { PORT } from './config.js'
import { conectionDB } from './database/connection.js'

conectionDB()
app.listen(PORT)
console.log('Server on Port', PORT)
