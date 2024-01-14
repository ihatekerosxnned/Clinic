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
        Medicines.belongsTo(models.Users, { foreignKey: 'UserId', as: 'user' });
        Medicines.hasMany(models.Faculties, {
            onDelete: "cascade"
        });
        Medicines.hasMany(models.Students, {
            onDelete: "cascade"
        });
    };

    return Medicines;
};
