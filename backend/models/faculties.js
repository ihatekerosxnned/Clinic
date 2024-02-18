module.exports = (sequelize, DataTypes) => {
    const Faculties = sequelize.define("Faculties", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complaint: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Faculties.associate = (models) => {
        Faculties.belongsTo(models.Medicines, { foreignKey: 'MedicineId', as: 'facultiesmed' });
    };

    return Faculties;
};
