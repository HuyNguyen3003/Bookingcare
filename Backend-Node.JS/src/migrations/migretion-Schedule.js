'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Schedules', {
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
            currentNumbe: {
                type: Sequelize.INTEGER
            },
            maxNumber: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            doctorId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Schedules');
    }
};