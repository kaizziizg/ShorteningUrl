import express from 'express'
import { getShortUrls } from '../utils/db.js'
const manageRouter = express.Router()

manageRouter.get('/api/shortUrls', async (req, res): Promise<any> => {
  const username: string = req.query.username as string

  if (req.session.user === username && username !== undefined) {
    const urls = await getShortUrls(username)
    res.json(urls)
  } else {
    res.json({ msg: 'Wrong authorization' })
  }
})

manageRouter.post('/updateUrl', async (req, res): Promise<void> => {
  const username: string = req.body.username
  const updateUrls: any[] = req.body.updateUrls
  console.log(req.body.updateUrls)
  if (req.session.user === username) {
    res.json(
      { msg: 'complete', updateUrls }
    )
  } else {
    res.json({ msg: 'Wrong authorization' })
  }
})

manageRouter.post('/delectUrl', async (req, res): Promise<void> => {
  const username: string = req.body.username
  const updateUrls: any[] = req.body.updateUrls
  console.log(req.body.updateUrls)
  if (req.session.user === username) {
    res.json(
      { msg: 'complete', updateUrls }
    )
  } else {
    res.json({ msg: 'Wrong authorization' })
  }
})

manageRouter.post('/refreshUrl', async (req, res): Promise<void> => {
  const username: string = req.body.username
  const updateUrls: any[] = req.body.updateUrls
  console.log(req.body.updateUrls)
  if (req.session.user === username) {
    res.json(
      { msg: 'complete', updateUrls }
    )
  } else {
    res.json({ msg: 'Wrong authorization' })
  }
})

manageRouter.get('/test/shortUrls', async (req, res): Promise<any> => {
  const username: string = req.query.username as string
  console.log('傳來的是: ' + username)
  const urls = await getShortUrls(username)
  res.json(urls)
})

export default manageRouter
