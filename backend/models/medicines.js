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
        Medicines.hasMany(models.Faculties, {
            onDelete: "cascade"
        });
        Medicines.belongsTo(models.Students, { foreignKey: 'MedicineId', as: 'medicine ' });
    };

    return Medicines;
};
