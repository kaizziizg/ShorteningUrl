import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import session from 'express-session'

import checkURLRouter from './routes/checkURL.js'
import shortUrlRouter from './routes/shortUrlRouter.js'
import signRouter from './routes/signRouter.js'
import manageRouter from './routes/manageRouter.js'
const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('shortUrlServiceByKaizz'))

declare module 'express-session' {
  interface SessionData {
    user: string
  }
}
app.use(session({
  secret: 'shortUrlServiceByKaizz',
  resave: false,
  saveUninitialized: false
}))

app.use(checkURLRouter)
app.use(signRouter)
app.use(manageRouter)
app.use(shortUrlRouter)

app.use(express.static(path.join('./', 'public')))
export default app
