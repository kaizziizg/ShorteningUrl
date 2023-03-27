import express from 'express'
import { SignIn, SignUp } from '../utils/db.js'

const signRouter = express.Router()

signRouter.get('/api/getUser', async (req, res): Promise<void> => {
  if (req.session.user === req.cookies.username && req.cookies.username !== undefined) {
    res.json({ username: req.cookies.username })
  } else {
    res.json({ username: 'Wrong authorization' })
  }
})

signRouter.post('/signUp', async (req, res): Promise<void> => {
  const username: string = req.body.username
  const email: string = req.body.email
  const password: string = req.body.password
  const signUpRes: any = await SignUp(username, email, password)
  res.json(
    signUpRes
  )
})

signRouter.post('/signIn', async (req, res): Promise<void> => {
  const email: string = req.body.email
  const password: string = req.body.password
  const signInRes: any = await SignIn(email, password)
  console.log(signInRes.username)
  if (signInRes.success === true) {
    req.session.user = signInRes.username
    res.cookie('user', `${req.session.user}`, {
      signed: true,
      maxAge: 60 * 60 * 1000 // expires after 1 hr
    })
    res.cookie('username', `${signInRes.username}`, {
      signed: false,
      maxAge: 60 * 60 * 1000 // expires after 1 hr
    })
    res.cookie('isLogin', true, {
      signed: false,
      maxAge: 60 * 60 * 1000 // expires after 1 hr
    })
  }

  res.json(
    signInRes
  )
})

signRouter.get('/logout', (req, res) => {
  // destroy session data
  res.clearCookie('user')
  res.clearCookie('username')
  res.clearCookie('isLogin')
  req.session.destroy((err) => {
    if (err !== undefined) {
      console.log(err)
    }
  })
  const home: string = req.headers.referer as string
  res.redirect(home)
})

export default signRouter
