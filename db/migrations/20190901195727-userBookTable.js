'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserBook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Books',
          },
          key: 'id'
        },
        onDelete: 'no action',
        onUpdate: 'cascade',
        allowNull: false
      },
      loanId:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Loans',
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'no action',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBook');
  }
};
