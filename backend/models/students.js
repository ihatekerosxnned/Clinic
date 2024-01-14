module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complaint: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // Disable automatic timestamps
    });

    return Students;
};
