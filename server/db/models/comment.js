module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'Post'
      });
      Comment.belongsTo(models.Comment, {
        foreignKey: 'parentId',
        as: 'Parent'
      });
      Comment.hasMany(models.Comment, {
        foreignKey: 'parentId',
        as: 'Replies'
      });
    }
  }
  Comment.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // ✅ ИЗМЕНИТЕ НА allowNull: true
      references: {
        model: 'Comments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments' // опционально
  });
  return Comment;
};