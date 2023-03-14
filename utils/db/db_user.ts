import { DataTypes } from 'sequelize'
import { sequelize } from './db_init.js'

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registrationTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {

})

export default Users
