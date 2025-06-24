import { DataTypes } from "sequelize";
import sequelize from "../../../../db/conection";


export const playerModel = sequelize.define("player", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field:"id"
    },
    fifaVersion: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"fifa_version"
    },
    fifaUpdate: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"fifa_update"
    },
    playerFaceURL: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"player_face_url"
    },
    longName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"long_name"
    },
    team:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"club_name"
    },
    positions:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"player_positions"

    },
    overall: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field:"overall"
    },
    pace: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"pace"
    },
    shooting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"shooting"
    },
    passing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"passing"
    },
    dribbling: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"dribbling"
    },
    defending: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"defending"
    },
    physic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"physic"
    },
},{
    timestamps:false
});
