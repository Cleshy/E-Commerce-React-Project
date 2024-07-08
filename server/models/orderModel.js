import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Order = sequelize.define(
  "Order",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billingCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billingZip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingZip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    isGuest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);

export default Order;
