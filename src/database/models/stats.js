module.exports = (sequelize,DataTypes)=>{
    let alias = "stats";
    let cols = {
        idstats:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            notNull:true,
            autoIncrement: true
        },
        t_merge:{
            type: DataTypes.INTEGER,
            unsigned:true,
            zeroFill:true,
        },
        t_buy:{
            type: DataTypes.INTEGER,
            zeroFill:true,
            unsigned:true,
        },
        enemy_kills:{
            type: DataTypes.INTEGER,
            zeroFill:true,
            unsigned:true,
        },
        cur_spent:{
            type: DataTypes.INTEGER,
            zeroFill:true,
            unsigned:true,
        },
        high_score:{
            type: DataTypes.INTEGER,
            zeroFill:true,
            unsigned:true,
        },
        game_time:{
            type: DataTypes.float,
            zeroFill:true,
            unsigned:true,
        },
        iduser:{
            type: DataTypes.INTEGER,
            unique:true,
            notNull:true,
            foreignKey:true,
        }
    }
    let config = {
        tableName: "stats"
    }
    const Stats = sequelize.define(alias,cols,config);
    return Stats;
}