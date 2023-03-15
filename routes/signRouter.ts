import express from 'express'
import { SignIn, SignUp } from '../utils/db.js'

const signRouter = express.Router()

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
  if (signInRes.success === true) {
    req.session.user = signInRes.username
    res.cookie('user', `${req.session.user}`, {
      signed: true, // use the sign
      maxAge: 60 * 60 * 1000 // expires after 1 hr
    })
    res.cookie('isLogin', true, {
      signed: false, // use the sign
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
  res.clearCookie('isLogin')
  req.session.destroy((err) => {
    if (err !== null) {
      console.log(err)
    }
  })
  res.redirect('/#/')
})

export default signRouter
