"use strict";
const bcrypt = require("bcrypt");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('users', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          profession: "Admin Micro",
          role: "admin",
          email: "admin@micro.com",
          password: await bcrypt.hash("12345678", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "student",
          profession: "Student Micro",
          role: "student",
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
