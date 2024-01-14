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
    }, {
        timestamps: false // Disable automatic timestamps
    });

    return Faculties;
};
