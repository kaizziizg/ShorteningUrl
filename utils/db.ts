import { getUTCCurrentTime, getUTCLifeTime, Trans2LocaleTime } from './Time.js'
import bcrypt from 'bcrypt'
import { sequelize, saltRounds } from './db/db_init.js'
import Users from './db/db_user.js'
import Urls from './db/db_urls.js'

async function SignUp (_username: string, _email: string, _password: string): Promise<any> {
  const res: any = {}
  res.username = _username
  res.email = _email
  res.password = _password

  const user = await Users.findOne({ where: { email: _email } })
  if (user === null) {
    const users = await Users.create({
      username: _username,
      email: _email,
      password: await bcrypt.hash(_password, saltRounds),
      registrationTime: getUTCCurrentTime()
    }).then(() => {
      res.msg = 'successfully created User!!'
      console.log('successfully created User!!')
      res.success = true
    }).catch((err) => {
      res.msg = `error occur: ${err}`
      console.log('error occur')
      console.log(err)
      res.success = false
    })
    return res
  } else {
    // already SignUp
    res.msg = 'this email address is already SignUp'
    res.success = false
    return res
  }
}

async function SignIn (_email: string, _password: string): Promise<any> {
  let isSignIn: boolean = false
  const res: any = {}
  res.email = _email
  res.password = _password
  const user = await Users.findOne({ where: { email: _email } })

  if (user === null) {
    console.log(`${_email} is not register`)
    res.success = false
    res.username = ' '
  } else {
    res.username = user.dataValues.username
    const hashPwd = user.dataValues.password
    await bcrypt.compare(_password, hashPwd).then(function (result) {
      isSignIn = result
      res.success = result
    })
  }
  res.msg = `${_email} login ${isSignIn}`
  return res
}

async function addShortUrl (_oriUrl: string, _shortURL: string, _owner: string, _lifeTime: number): Promise<boolean> {
  let isAdd: boolean = false
  console.log(`_oriUrl : ${_oriUrl} _shortURL : ${_shortURL}`)
  const newUrl = await Urls.create({
    oriUrl: _oriUrl,
    shortUrl: _shortURL,
    owner: _owner,
    lifeTime: getUTCLifeTime(_lifeTime)
  }).then((res) => {
    isAdd = true
  }).catch((err) => {
    isAdd = false
    console.log(err)
  })
  return isAdd
}

async function getOriUrl (_shortURL: string): Promise<string> {
  const urls = await Urls.findOne({ where: { shortUrl: _shortURL } })
  if (urls === null) {
    return 'Not found!'
  } else {
    await urls.update({ clickTime: Number(urls.dataValues.clickTime) + 1 })
    await urls.save()
    console.log(urls.dataValues.clickTime)
    return urls.dataValues.oriUrl
  }
}

async function isShortUrlExist (_oriUrl: string): Promise<any> {
  const urls = await Urls.findOne({ where: { oriUrl: _oriUrl } })
  if (urls === null) {
    return 'not found'
  } else {
    return urls.dataValues
  }
}

async function getShortUrls (_username: string): Promise<any> {
  const urls = await Urls.findAll({ where: { owner: _username } })
  if (urls === null) {
    return 'not found'
  } else {
    return urls
  }
}

async function updateShortUrls (updateUrls: any): Promise<boolean> {
  Object.keys(updateUrls).forEach(async function (key) {
    try {
      await Urls.update({ shortUrl: updateUrls[key] }, { where: { shortUrl: key } })
    } catch (e) {
      return false
    }
  })
  return true
}

async function refreshShortUrls (refreshUrls: string[]): Promise<boolean> {
  refreshUrls.forEach(async function (refreshUrl: string) {
    try {
      await Urls.update({ lifeTime: getUTCLifeTime(30) }, { where: { shortUrl: refreshUrl } })
    } catch (e) {
      return false
    }
  })
  return true
}

async function deleteShortUrls (deleteUrls: string[]): Promise<boolean> {
  try {
    await Urls.destroy({ where: { shortUrl: deleteUrls } })
  } catch (e) {
    return false
  }
  return true
}

export { SignIn, SignUp, addShortUrl, getOriUrl, isShortUrlExist, getShortUrls, updateShortUrls, refreshShortUrls, deleteShortUrls }
