import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { UsuarioModel } from "../interfaces/usuario.interface";

const Usuario =
  sequelize.define <
  UsuarioModel >
  ("Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  });

export default Usuario;
