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
        allowNull: false
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBook');
  }
}