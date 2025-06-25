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
    reputation:{
        type: DataTypes.NUMBER,
        allowNull:false,
        field:"international_reputation"

    },
    age:{
        type: DataTypes.NUMBER,
        allowNull:false,
        field:"age"

    },
    weightKg:{
        type: DataTypes.NUMBER,
        allowNull:false,
        field:"weight_kg"

    },
    heightCm:{
        type: DataTypes.NUMBER,
        allowNull:false,
        field:"height_cm"

    },
    nationality:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"nationality_name"

    },
    preferedFoot:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"preferred_foot"

    },
    traits:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"player_traits"

    },
    bodyType:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"body_type"

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
    attackingCrossing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "attacking_crossing",
    },
    attackingFinishing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "attacking_finishing",
    },
    attackingHeadingAccuracy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "attacking_heading_accuracy",
    },
    attackingShortPassing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "attacking_short_passing",
    },
    attackingVolleys: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "attacking_volleys"
    },
    




































    
},{
    timestamps:false
});
