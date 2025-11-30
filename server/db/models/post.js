'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ✅ ДОБАВИТЬ АССОЦИАЦИЮ С USER
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User' // псевдоним для включения в запросы
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // имя таблицы
        key: 'id'
      }
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // по умолчанию не опубликован
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};