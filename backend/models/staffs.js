module.exports = (sequelize, DataTypes) => {
    const Staffs = sequelize.define("Staffs", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        },
    }, {
        timestamps: false // Disable automatic timestamps
    });

    return Staffs;
};
