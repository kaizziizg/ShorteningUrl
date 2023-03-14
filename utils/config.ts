const host: string = process.env.ShortUrlServer as string
const user: string = process.env.ShortUrlUsername as string
const pwd: string = process.env.ShortUrlPassword as string
const INSTANCE_CONNECTION_NAME: string = process.env.INSTANCE_CONNECTION_NAME as string
const database: string = 'shortUrlService'
// console.log(`env\n host: ${host}\n user: ${user}\n pwd: ${pwd}`)

export { host, user, pwd, database, INSTANCE_CONNECTION_NAME }
