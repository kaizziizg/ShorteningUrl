import bcrypt from 'bcrypt'

const saltRounds = 10

const hash = await bcrypt.hash('password', saltRounds)
console.log(hash)
console.log(hash.length)
console.log(await bcrypt.compare('passwords', hash))