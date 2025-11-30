'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Создаем таблицу
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false // ✅ ДОБАВЬТЕ allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false // ✅ ДОБАВЬТЕ allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false // ✅ ДОБАВЬТЕ allowNull: false
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true // ✅ ДОБАВЬТЕ allowNull: true для опционального поля
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

    // 2. Добавляем внешние ключи ПОСЛЕ создания таблицы
    await queryInterface.addConstraint('Comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_comment_user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_comment_post',
      references: {
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['parentId'],
      type: 'foreign key',
      name: 'fk_comment_parent',
      references: {
        table: 'Comments',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }, // ✅ ЗАКРЫВАЮЩАЯ СКОБКА ДЛЯ up()

  async down(queryInterface, Sequelize) {
    // Удаляем таблицу (внешние ключи удалятся автоматически)
    await queryInterface.dropTable('Comments');
  }
};