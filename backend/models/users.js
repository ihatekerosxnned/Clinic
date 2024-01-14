module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },{
        timestamps: false // Disable automatic timestamps
    });
    
    Users.associate = (models) =>{
        Users.hasMany(models.Medicines, {
            onDelete:"cascade"
        });
    }
    return Users
}