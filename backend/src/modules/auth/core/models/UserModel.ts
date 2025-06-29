import { DataTypes } from "sequelize";
import sequelize from "../../../../db/conection";


export const userModel = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field:"id"
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"user_name"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"password"
    },
}, {
    timestamps: false,
  })





















