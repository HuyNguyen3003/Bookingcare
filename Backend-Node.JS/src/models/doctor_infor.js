'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class doctor_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            doctor_Infor.belongsTo(models.User, { foreignKey: 'doctorId' })

            doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceIdData' })
            doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceIdData' })
            doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentIdData' })

            doctor_Infor.belongsTo(models.Specialty, { foreignKey: 'specialtyid', targetKey: 'id', as: 'specialtyidData' })







        }
    };



    doctor_Infor.init({
        // id: DataTypes.INTEGER,
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER



    }, {
        sequelize,
        modelName: 'doctor_Infor',
        freezeTableName: true

    });
    return doctor_Infor;
};