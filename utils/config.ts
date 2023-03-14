const host: string = process.env.ShortUrlServer as string
const user: string = process.env.ShortUrlUsername as string
const pwd: string = process.env.ShortUrlPassword as string
const database: string = 'shortUrlService'
console.log(`env\n host: ${host}\n user: ${user}\n pwd: ${pwd}`)

export { host, user, pwd, database }
