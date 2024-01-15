module.exports = (sequelize, DataTypes) => {
    const Medicines = sequelize.define("Medicines", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    Medicines.associate = (models) => {
        Medicines.belongsTo(models.Faculties, { foreignKey: 'id', as: 'medicine ' });
        Medicines.belongsTo(models.Students, { foreignKey: 'id', as: 'studentsmed ' });
    };

    return Medicines;
};