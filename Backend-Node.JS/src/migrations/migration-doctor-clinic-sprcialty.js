'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_clinic_speciaid', {
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
            doctoerId: {
                type: Sequelize.INTEGER
            },
            clinicId: {
                type: Sequelize.INTEGER
            },
            sprcialtyId: {
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
        await queryInterface.dropTable('doctor_clinic_speciaid');
    }
};