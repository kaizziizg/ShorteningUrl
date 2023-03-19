import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
// import logger from 'morgan'
import cors from 'cors'
import session from 'express-session'

import checkURLRouter from './routes/checkURL.js'
import shortUrlRouter from './routes/shortUrlRouter.js'
import signRouter from './routes/signRouter.js'
import manageRouter from './routes/manageRouter.js'
import ogs from 'open-graph-scraper'

const app = express()

const corsOptions = {
  credentials: true,
  origin: [
    'http://127.0.0.1:8000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

// app.use(logger('dev'))
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
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}))
app.set('view engine', 'ejs')
app.set('views', (path.join('./', 'views')))
app.use(express.static(path.join('./', 'public')))

app.use(checkURLRouter)
app.use(signRouter)
app.use(manageRouter)
app.use(shortUrlRouter)

export default app
