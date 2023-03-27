import express from 'express'
import UrlInfo from '../utils/class/UrlInfo.js'
import { CheckURLExist } from '../utils/checkURLExist.js'
import { addShortUrl, getOriUrl, isShortUrlExist } from '../utils/db.js'
import ogmGetter from '../utils/ogmGetter.js'

const shortUrlRouter = express.Router()

shortUrlRouter.get('/api/shorten', async (req, res): Promise<void> => {
  let owner: string = 'noOwner'
  if (req.session.user !== undefined && req.session.user === req.body.owner) {
    owner = req.body.owner
  }
  let urlInfo: UrlInfo = new UrlInfo(owner, req.query.url as string)
  urlInfo.getHash()
  const isUrlExist = await CheckURLExist(urlInfo.oriUrl)
  if (!isUrlExist) {
    urlInfo.isSuccess = false
    urlInfo.msg = 'This Url doesnt work'
    res.json({ urlInfo })
    return
  }
  urlInfo = await isShortUrlExist(urlInfo)
  if (urlInfo.msg === 'not found') {
    ({ ogmTitle: urlInfo.ogmTitle, ogmDescription: urlInfo.ogmDescription, ogImage: urlInfo.ogmImage } = await ogmGetter(urlInfo.oriUrl))
    urlInfo = await addShortUrl(urlInfo)
    urlInfo.shortUrl = 'https://' + req.hostname + '/' + urlInfo.shortUrl
  } else {
    urlInfo.msg = 'The ShortUrl is already created'
    urlInfo.isSuccess = true
    urlInfo.shortUrl = 'https://' + req.hostname + '/' + String(urlInfo.shortUrl)
  }
  res.json({ urlInfo })
})

shortUrlRouter.post('/shorten', async (req, res): Promise<void> => {
  let owner: string = 'noOwner'
  let isLogin: boolean = false
  if (req.session.user !== undefined && req.session.user === req.body.owner) {
    owner = req.body.owner
  }
  if (req.session.user === owner && owner !== undefined) {
    isLogin = true
  }
  let urlInfo: UrlInfo = new UrlInfo(owner, req.body.url)
  urlInfo.getHash()
  const isUrlExist = await CheckURLExist(urlInfo.oriUrl)
  if (!isUrlExist) {
    urlInfo.isSuccess = false
    urlInfo.msg = 'This Url doesnt work'
    urlInfo.shortUrl = 'This URL doesnt work'
    res.json({ urlInfo })
    return
  }
  urlInfo = await isShortUrlExist(urlInfo)
  if (urlInfo.msg === 'not found' || isLogin) {
    ({ ogmTitle: urlInfo.ogmTitle, ogmDescription: urlInfo.ogmDescription, ogImage: urlInfo.ogmImage } = await ogmGetter(urlInfo.oriUrl))
    urlInfo = await addShortUrl(urlInfo)
    urlInfo.shortUrl = 'https://' + req.hostname + '/' + urlInfo.shortUrl
  } else {
    urlInfo.msg = 'The ShortUrl is already created'
    urlInfo.isSuccess = true
    urlInfo.shortUrl = 'https://' + req.hostname + '/' + String(urlInfo.shortUrl)
  }
  res.json({ urlInfo })
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
