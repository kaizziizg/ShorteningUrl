const host: string = process.env.ShortUrlServer as string
const user: string = process.env.ShortUrlUsername as string
const pwd: string = process.env.ShortUrlPassword as string
const INSTANCE_CONNECTION_NAME: string = process.env.INSTANCE_CONNECTION_NAME as string
const database: string = 'shortUrlService'
const isGcpEnv: boolean = (process.env.isGcpEnv === 'true')

if (isGcpEnv) {
  console.log('Current Environment is GCP, Connect SQL with Unix sockets')
  console.log(`env\n host: ${INSTANCE_CONNECTION_NAME}\n user: ${user}\n pwd: ${pwd}`)
} else {
  console.log('Current Environment is general, Connect SQL with TCP')
  console.log(`env\n host: ${host}\n user: ${user}\n pwd: ${pwd}`)
}

export { host, user, pwd, database, INSTANCE_CONNECTION_NAME, isGcpEnv }
