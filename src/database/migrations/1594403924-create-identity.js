'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: 'identity' },
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      },
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: 'identity' });
  },
};
