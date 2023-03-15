import express from 'express'
import getHash from '../utils/hashGenetator.js'
import { CheckURLExist, checkProtocol } from '../utils/checkURLExist.js'
import { addShortUrl, getOriUrl, isShortUrlExist } from '../utils/db.js'

const shortUrlRouter = express.Router()

shortUrlRouter.get('/shorten', async (req, res): Promise<void> => {
  let originalUrl: string = req.query.url as string
  let success: boolean = true
  let msg: string = ' '
  originalUrl = checkProtocol(originalUrl)
  const isUrlExist = await CheckURLExist(originalUrl)

  if (!isUrlExist) {
    success = false
    msg = 'This Url doesnt work'
    res.json({ success, msg })
  } else {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const ShortUrl: string = await isShortUrlExist(originalUrl)
    if (ShortUrl === 'not found') {
      const hashURL: string = getHash(originalUrl)
      const shortUrl: string = 'https://' + req.hostname + '/' + hashURL
      addShortUrl(originalUrl, hashURL, 'noOwner', 30)
      res.json({ success, originalUrl, shortUrl })
    } else {
      const msg: string = 'The ShortUrl is already created'
      res.json({ success, msg, originalUrl, ShortUrl })
    }
  }
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const ShortUrl: string = await isShortUrlExist(originalUrl)
    if (ShortUrl === 'not found') {
      const hashURL: string = getHash(originalUrl)
      const shortUrl: string = 'https://' + req.hostname + '/' + hashURL
      addShortUrl(originalUrl, hashURL, 'noOwner', 30)
      res.json({ success, originalUrl, shortUrl })
    } else {
      const msg: string = 'The ShortUrl is already created'
      res.json({ success, msg, originalUrl, ShortUrl })
    }
  }
})

shortUrlRouter.get('/:shortUrl', async (req, res) => {
  // Note : getOriUrl(url) will add one clickTime
  const shortUrl = req.params.shortUrl
  const OriUrl: string = await getOriUrl(shortUrl)
  res.redirect(`${OriUrl}`)
})

export default shortUrlRouter
