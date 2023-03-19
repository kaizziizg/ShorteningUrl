import express from 'express'
import { getShortUrls, updateShortUrls, refreshShortUrls, deleteShortUrls } from '../utils/db.js'
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

manageRouter.post('/updateUrl', async (req, res): Promise<any> => {
  const username: string = req.body.username
  const updateUrls: any[] = req.body.updateUrls
  console.log(req.body.updateUrls)
  if (req.session.user === username) {
    const result = await updateShortUrls(updateUrls)
    return result ? res.json({ msg: 'Update Success' }) : res.json({ msg: 'Update Failed' })
  } else {
    res.json({ msg: 'Wrong authorization' })
  }
})

manageRouter.post('/delectUrl', async (req, res): Promise<any> => {
  const username: string = req.body.username
  const deleteUrls: any[] = req.body.deleteUrls
  console.log(req.body.deleteUrls)
  if (req.session.user === username) {
    const result = await deleteShortUrls(deleteUrls)
    return result ? res.json({ msg: 'Delect Success' }) : res.json({ msg: 'Delect Failed' })
  } else {
    res.json({ msg: 'Wrong authorization' })
  }
})

manageRouter.post('/refreshUrl', async (req, res): Promise<any> => {
  const username: string = req.body.username
  const refreshUrls: any[] = req.body.refreshUrls
  console.log(req.body.refreshUrls)
  if (req.session.user === username) {
    const result = await refreshShortUrls(refreshUrls)
    return result ? res.json({ msg: 'Refresh Success' }) : res.json({ msg: 'Refresh Failed' })
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
