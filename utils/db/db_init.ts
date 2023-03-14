import { Sequelize } from 'sequelize'
import * as env from '../config.js'

const saltRounds = 10

const sequelize = new Sequelize(env.database, env.user, env.pwd, {
  host: env.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
})

export { sequelize, saltRounds }
