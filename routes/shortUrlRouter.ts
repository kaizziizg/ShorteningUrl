import express from 'express'
import getHash from '../utils/hashGenetator.js'
import { CheckURLExist, checkProtocol } from '../utils/checkURLExist.js'
import { addShortUrl, getOriUrl } from '../utils/db.js'

const shortUrlRouter = express.Router()

shortUrlRouter.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl
  const OriUrl: string = await getOriUrl(shortUrl)
  res.json({ shortUrl, OriUrl })
})

shortUrlRouter.post('/shorten', async (req, res): Promise<void> => {
  let originalUrl: string = req.body.url
  let success: boolean = true
  let msg: string = ' '
  originalUrl = checkProtocol(originalUrl)
  const isUrlExist = await CheckURLExist(originalUrl)

  if (!isUrlExist) {
    success = false
    msg = 'This Url doesnt work'
    res.json({ success, msg })
  } else {
    const hashURL: string = getHash(originalUrl)
    const shortUrl: string = 'https://' + req.hostname + '/' + hashURL
    addShortUrl(originalUrl, hashURL, 'noOwner', 30)
    res.json({ success, originalUrl, shortUrl })
  }
})

export default shortUrlRouter
