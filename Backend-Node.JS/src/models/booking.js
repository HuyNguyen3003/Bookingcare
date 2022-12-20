'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            Booking.belongsTo(models.User, { foreignKey: 'patientiId', targetKey: 'id', as: 'patientData' })

            Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'patientDataPatient' })


        }
    };
    Booking.init({
        // id: DataTypes.INTEGER,
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientiId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};