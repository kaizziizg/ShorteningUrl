import { DataTypes } from 'sequelize'
import { sequelize } from './db_init.js'

const Urls = sequelize.define('urls', {
  oriUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ogmTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ogmDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ogmImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lifeTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {

})

export default Urls
