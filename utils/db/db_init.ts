import { Sequelize } from 'sequelize'
import * as env from '../config.js'

const saltRounds = 10
const isGcpEnv: boolean = env.isGcpEnv

let sequelize = new Sequelize(env.database, env.user, env.pwd, {
  host: env.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
})

if (isGcpEnv) {
// in GCP
  sequelize = new Sequelize(env.database, env.user, env.pwd, {
    dialect: 'mysql',
    host: `/cloudsql/${env.INSTANCE_CONNECTION_NAME}`,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
    // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
    // same as host string above
      socketPath: `/cloudsql/${env.INSTANCE_CONNECTION_NAME}`
    },
    define: {
      timestamps: false
    }
  })
}

export { sequelize, saltRounds }
