import { getUTCCurrentTime, getUTCLifeTime, Trans2LocaleTime } from './Time.js'
import bcrypt from 'bcrypt'
import { sequelize, saltRounds } from './db/db_init.js'
import Users from './db/db_user.js'
import Urls from './db/db_urls.js'
// import { INTEGER } from 'sequelize'

function registerUser (_username: string, _email: string, _password: string): boolean {
  let isRegister: boolean = false
  void sequelize.sync().then(async () => {
    Users.create({
      username: _username,
      email: _email,
      password: await bcrypt.hash(_password, saltRounds),
      registrationTime: getUTCCurrentTime()
    }).then(() => {
      console.log('successfully created User!!')
      isRegister = true
    }).catch((err) => {
      console.log('error occur')
      console.log(err)
      isRegister = false
    })
  })
  return isRegister
}

async function addShortUrl (_oriUrl: string, _shortURL: string, _owner: string, _liftTime: number): Promise<boolean> {
  let isAdd: boolean = false
  console.log(`_oriUrl : ${_oriUrl} _shortURL : ${_shortURL}`)
  const newUrl = await Urls.create({
    oriUrl: _oriUrl,
    shortUrl: _shortURL,
    owner: _owner,
    lifeTime: getUTCLifeTime(_liftTime)
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

async function isShortUrlExist (_oriUrl: string): Promise<string> {
  const urls = await Urls.findOne({ where: { oriUrl: _oriUrl } })
  if (urls === null) {
    return 'not found'
  } else {
    return urls.dataValues.shortUrl
  }
}

export { registerUser, addShortUrl, getOriUrl, isShortUrlExist }
