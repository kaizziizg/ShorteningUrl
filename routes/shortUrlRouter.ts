import express from 'express'
import getHash from '../utils/hashGenetator.js'
import { CheckURLExist, checkProtocol } from '../utils/checkURLExist.js'
import { addShortUrl, getOriUrl, isShortUrlExist } from '../utils/db.js'
import ogs from 'open-graph-scraper'
const shortUrlRouter = express.Router()

shortUrlRouter.get('/api/shorten', async (req, res): Promise<void> => {
  let originalUrl: string = req.query.url as string

  let success: boolean = true
  let msg: string = ' '
  let ogmTitle: string = ''
  let ogmDescription: string = ''
  let ogImage: string = ''
  originalUrl = checkProtocol(originalUrl)
  const isUrlExist = await CheckURLExist(originalUrl)

  if (!isUrlExist) {
    success = false
    msg = 'This Url doesnt work'
    res.json({ success, msg })
  } else {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const ShortUrlExist: string = await isShortUrlExist(originalUrl)
    await ogs({ url: originalUrl })
      .then((res: any) => {
        const { error, result, response } = res
        ogmTitle = result.ogmTitle
        ogmDescription = result.ogmDescription
        ogImage = result.ogImage.url
        console.log(`ogmTitle : ${result.ogmTitle}`)
        console.log(`ogmDescription : ${result.ogmDescription}`)
        console.log(`ogImageURL : ${result.ogImage.url}`)
      }).catch((err) => {
        console.log(err)
      })
    if (ShortUrlExist === 'not found') {
      const hashURL: string = getHash(originalUrl)
      const shortUrl: string = 'https://' + req.hostname + '/' + hashURL
      addShortUrl(originalUrl, hashURL, 'noOwner', 30, ogmTitle, ogmDescription, ogImage)
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
  let owner: string = 'noOwner'
  if (req.session.user !== undefined && req.session.user === req.body.owner) {
    owner = req.body.owner
  }
  let success: boolean = true
  let msg: string = ' '
  let shortUrl: string = ''
  let clickTime: number = 0
  let ogmTitle: string = ''
  let ogmDescription: string = ''
  let ogmImage: string = ''
  originalUrl = checkProtocol(originalUrl)
  const isUrlExist = await CheckURLExist(originalUrl)
  if (!isUrlExist) {
    success = false
    msg = 'This Url doesnt work'
    res.json({ success, msg })
  } else {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const ShortUrlExist: any = await isShortUrlExist(originalUrl)

    await ogs({ url: originalUrl })
      .then((res: any) => {
        const { error, result, response } = res
        ogmTitle = result.ogTitle === undefined ? ' ' : result.ogTitle
        ogmDescription = result.ogDescription === undefined ? ' ' : result.ogDescription
        ogmImage = result.ogImage === undefined ? ' ' : result.ogImage.url

        console.log(`ogmTitle : ${ogmTitle}`)
        console.log(`ogmDescription : ${ogmDescription}`)
        console.log(`ogImageURL : ${ogmImage}`)
      }).catch((err) => {
        console.log(err)
      })
    if (ShortUrlExist.shortUrl === undefined) {
      console.log(`owner:${owner}`)
      const hashURL: string = getHash(originalUrl)
      shortUrl = 'https://' + req.hostname + '/' + hashURL
      clickTime = 0
      addShortUrl(originalUrl, hashURL, 'noOwner', 30, ogmTitle, ogmDescription, ogmImage)
      res.json({ success, originalUrl, shortUrl, clickTime, ogmTitle, ogmDescription, ogmImage })
    } else {
      const msg: string = 'The ShortUrl is already created'
      shortUrl = 'https://' + req.hostname + '/' + String(ShortUrlExist.shortUrl)
      clickTime = ShortUrlExist.clickTime
      ogmTitle = ShortUrlExist.ogmTitle
      ogmDescription = ShortUrlExist.ogmDescription
      ogmImage = ShortUrlExist.ogmImage
      console.log(ShortUrlExist)
      res.json({ success, msg, ShortUrlExist })
    }
  }
})

shortUrlRouter.get('/:shortUrl', async (req, res, next) => {
  // Note : getOriUrl(url) will add one clickTime
  const shortUrl = req.params.shortUrl

  if (shortUrl === 'Not found!') {
    next()
  } else {
    console.log(shortUrl)
    const OriUrl: any = await getOriUrl(shortUrl)
    res.render('OpenGraphMetadata', {
      ogm: {
        url: OriUrl.oriUrl,
        title: OriUrl.ogmTitle,
        description: OriUrl.ogmDescription,
        image: OriUrl.ogmImage
      }
    })
    // res.redirect(`${OriUrl}`)
  }
})

export default shortUrlRouter
