/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Identity
    const user1Id = uuidv4();
    let hash = bcrypt.hashSync('password', 10);

    await queryInterface.bulkInsert('identity', [
      {
        id: user1Id,
        username: 'user1@email.com',
        password: hash,
        createdAt: new Date(moment.utc().format()),
        updatedAt: new Date(moment.utc().format()),
      },
    ]);

    await queryInterface.bulkInsert('profile', [
      {
        id: uuidv4(),
        firstName: 'User',
        lastName: '1',
        identityId: user1Id,
        createdAt: new Date(moment.utc().format()),
        updatedAt: new Date(moment.utc().format()),
      },
    ]);

    // Identity
    const user2Id = uuidv4();
    hash = bcrypt.hashSync('password', 10);
    await queryInterface.bulkInsert('identity', [
      {
        id: user2Id,
        username: 'user2@email.com',
        password: hash,
        createdAt: new Date(moment.utc().format()),
        updatedAt: new Date(moment.utc().format()),
      },
    ]);

    await queryInterface.bulkInsert('profile', [
      {
        id: uuidv4(),
        firstName: 'User',
        lastName: '2',
        identityId: user2Id,
        createdAt: new Date(moment.utc().format()),
        updatedAt: new Date(moment.utc().format()),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'identity' }, null, {});
  },
};
