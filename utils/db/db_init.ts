import { Sequelize } from 'sequelize'
import * as env from '../config.js'

const saltRounds = 10


// const sequelize = new Sequelize(env.database, env.user, env.pwd, {
//   in common environment
//   host: env.host,
//   dialect: 'mysql',
//   define: {
//     timestamps: false
//   }
// })

// in GCP
const sequelize = new Sequelize(env.database, env.user, env.pwd, {
  host: `/cloudsql/${env.INSTANCE_CONNECTION_NAME}`,
  dialect: 'mysql',
  dialectOptions: {
    // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
    // same as host string above
    socketPath: `/cloudsql/${env.INSTANCE_CONNECTION_NAME}`
  },
  define: {
    timestamps: false
  }
})

export { sequelize, saltRounds }
