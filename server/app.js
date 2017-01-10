import express from 'express'
import mongoose from 'mongoose'
import Promise from 'bluebird'
mongoose.Promise = Promise

import config from './config'
import expressConfig from './config/express'
import routers from './routers'


const app = express()
const port = 3456


expressConfig(app)
routers(app)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})


function connect() {
  return mongoose.connect(config.db).connection
}


function listen() {
  app.listen(port, () => {
    console.log(`server started on port ${port}`)
  })
}


connect()
  .on('error', console.log)
  .on('open', listen)
  .on('disconnected', connect)
