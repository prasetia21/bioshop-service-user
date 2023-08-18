'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("customers-payment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customers_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("customers_payment", {
      type: "foreign key",
      fields: ["customers_id"],
      name: "PAYMENT_CUSTOMERS_ID",
      references: {
        table: "customers",
        field: "id"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customers_payment');
  }
};
