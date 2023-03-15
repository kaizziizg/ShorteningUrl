import express from 'express'
import getHash from '../utils/hashGenetator.js'
import { CheckURLExist, checkProtocol } from '../utils/checkURLExist.js'
import { addShortUrl, getOriUrl, isShortUrlExist } from '../utils/db.js'

const shortUrlRouter = express.Router()

shortUrlRouter.get('/api/shorten', async (req, res): Promise<void> => {
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
    const ShortUrlExist: string = await isShortUrlExist(originalUrl)
    if (ShortUrlExist === 'not found') {
      const hashURL: string = getHash(originalUrl)
      const shortUrl: string = 'https://' + req.hostname + '/' + hashURL
      addShortUrl(originalUrl, hashURL, 'noOwner', 30)
      res.json({ success, originalUrl, shortUrl })
    } else {
      const msg: string = 'The ShortUrl is already created'
      const shortUrl: string = 'https://' + req.hostname + '/' + ShortUrlExist
      res.json({ success, msg, originalUrl, shortUrl })
    }
  }
})

shortUrlRouter.post('/shorten', async (req, res): Promise<void> => {
  let originalUrl: string = req.body.url
  let owner: string = req.body.owner
  if (owner === undefined) { owner = 'noOwner' }
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
    const ShortUrlExist: any = await isShortUrlExist(originalUrl)
    console.log(ShortUrlExist.shortUrl)
    if (ShortUrlExist.shortUrl === undefined) {
      const hashURL: string = getHash(originalUrl)
      const shortUrl: string = 'https://' + req.hostname + '/' + hashURL
      const clickTime = 0

      addShortUrl(originalUrl, hashURL, owner, 30)
      res.json({ success, originalUrl, shortUrl, clickTime })
    } else {
      const msg: string = 'The ShortUrl is already created'
      const shortUrl: string = 'https://' + req.hostname + '/' + String(ShortUrlExist.shortUrl)
      const clickTime: number = ShortUrlExist.clickTime
      res.json({ success, msg, originalUrl, shortUrl, clickTime })
    }
  }
})

shortUrlRouter.get('/:shortUrl', async (req, res, next) => {
  // Note : getOriUrl(url) will add one clickTime
  const shortUrl = req.params.shortUrl

  if (shortUrl === 'Not found!' || shortUrl.length !== 6) {
    next()
  } else {
    console.log(shortUrl)
    const OriUrl: string = await getOriUrl(shortUrl)
    res.redirect(`${OriUrl}`)
  }
})

export default shortUrlRouter
