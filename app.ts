import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import checkURLRouter from './routes/checkURL.js'
import shortUrlRouter from './routes/shortUrlRouter.js'

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(checkURLRouter)
app.use(shortUrlRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(express.static(path.join('./', 'public')))

export default app
