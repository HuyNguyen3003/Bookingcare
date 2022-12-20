'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {


            Specialty.hasMany(models.doctor_Infor, { foreignKey: 'specialtyId', as: 'specialtyidData' })



        }
    };
    Specialty.init({
        // id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        descriptionMarkdown: DataTypes.TEXT,
        descriptionHTML: DataTypes.TEXT,
        image: DataTypes.TEXT,


    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};