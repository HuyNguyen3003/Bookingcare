'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Histories', {
            // id: DataTypes.STRING,
            // email: DataTypes.STRING,
            // firstName: DataTypes.STRING,
            // lastName: DataTypes.STRING,
            // address: DataTypes.STRING,
            // gender: DataTypes.BOOLEAN,
            // roleid: DataTypes.STRING
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.STRING
            },
            doctorId: {
                type: Sequelize.STRING
            },
            descrition: {
                type: Sequelize.TEXT
            },
            files: {
                type: Sequelize.TEXT
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Histories');
    }
};