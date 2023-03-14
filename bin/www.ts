import app from '../app.js'
import Debug from 'debug'
import http from 'http'
const debug = Debug('url-shortening:server')
const port = normalizePort(process.env.PORT !== null ? '3000' : process.env.PORT)
app.set('port', port)
const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort (val: any): any {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError (error: any): never {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + String(port)

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
   * Event listener for HTTP server 'listening' event.
   */

function onListening (): void {
  const addr: any = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + String(addr.port)
  debug('Listening on ' + bind)
}
