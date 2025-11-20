// migrations/XXXXXX-create-likes.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: { // ⚡ ссылается на Posts
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts', // твоя таблица постов
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Уникальный индекс - один лайк на пост от пользователя
    await queryInterface.addIndex('likes', ['postId', 'userId'], {
      unique: true,
      name: 'unique_like_per_post'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};