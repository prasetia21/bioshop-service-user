"use strict";
const bcrypt = require("bcrypt");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "John Doe",
          phone: 087734855511,
          role: "admin",
          email: "admin@micro.com",
          password: await bcrypt.hash("12345678", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user",
          phone: 087734855511,
          role: "user",
          email: "student@micro.com",
          password: await bcrypt.hash("12345678", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('users', null, {});
     */

     await queryInterface.bulkDelete('users', null, {});
  },
};
