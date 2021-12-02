const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../database/setup');

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Esse campo precisa ser um tipo email"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "Esse campo não aceita deixar em branco"
      },
      len: {
        args: [8, 35],
        msg: "o tamanho aceitado é entre 8 a 35 caracteres"
      }
    },
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
})

module.exports = User;
