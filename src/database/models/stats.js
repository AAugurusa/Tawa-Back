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
        },
        t_buy:{
            type: DataTypes.INTEGER,
        },
        enemy_kills:{
            type: DataTypes.INTEGER,
        },
        cur_spent:{
            type: DataTypes.INTEGER,
        },
        high_score:{
            type: DataTypes.INTEGER,
        },
        game_time:{
            type: DataTypes.float,
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