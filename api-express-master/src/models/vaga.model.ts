const { DataTypes } = require('sequelize');
import sequelize from "../config/database"
import { VagasModel } from "../interfaces/vagas.interface";

const Vaga = sequelize.define<VagasModel>('Vaga', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_cadastro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: "vagas",
  timestamps: false,
}
);

export default Vaga;
