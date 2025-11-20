// models/like.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // Like принадлежит User
      Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      
      // Like принадлежит Post (в твоём случае товары - это посты)
      Like.belongsTo(models.Post, {
        foreignKey: 'postId', // меняем productId на postId
        as: 'post'
      });
    }
  }

  Like.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postId: { // ⚡ ИЗМЕНИЛ productId на postId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // ссылается на таблицу Posts
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // ссылается на таблицу Users
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    indexes: [
      {
        unique: true,
        fields: ['postId', 'userId'] // уникальный индекс
      }
    ]
  });

  return Like;
};