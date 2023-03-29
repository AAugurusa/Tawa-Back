module.exports = (sequelize,DataTypes)=>{
    let alias = "user"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            notNull:true,
            autoIncrement: true
        }
        ,nickname:{
            type: DataTypes.varchar(45),
            unique:true,
            notNull:true
        }
        ,password:{
            type: DataTypes.varchar(45),
            notNull:true
        }
    }
    let config = {
        tableName: "users"
    }
    const User = sequelize.define(alias,cols,config);
    return User
}