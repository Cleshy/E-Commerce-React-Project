import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isGuest: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    role: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "Users" }
);

export default User;
