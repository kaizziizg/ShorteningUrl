import express from 'express'
import {CheckURLExist} from '../utils/checkURLExist.js'
import getHash from '../utils/hashGenetator.js'
const checkURLRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
checkURLRouter.get('/checkURLRouter', async (req, res): Promise<void> => {
  const url: any = req.query.url
  const existense = await CheckURLExist(url)
  let msg: string = ' '
  let shortURL: string = 'https://hackmd.io/'
  if (existense) {
    shortURL += getHash(url)
    msg = 'success generator shortURL'
  } else {
    shortURL = 'error'
    msg = "url isn't exist,please re-check"
  }
  res.json({ existense, msg, shortURL })
})

export default checkURLRouter
