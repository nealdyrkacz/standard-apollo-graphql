'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: 'profile' },
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        identityId: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'identity',
            },
            key: 'id',
          },
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
    await queryInterface.dropTable({ tableName: 'profile' });
  },
};
