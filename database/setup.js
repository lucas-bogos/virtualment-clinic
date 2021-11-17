
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clinicDb', 'user', 'pw', {
  dialect: 'sqlite',
  host: './clinicDb.sqlite'
})

module.exports = sequelize;
