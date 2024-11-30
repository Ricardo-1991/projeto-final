import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export interface VagasModel
  extends Model<
    InferAttributes<VagasModel>,
    InferCreationAttributes<VagasModel>
  > {
  id: CreationOptional<string>;
  titulo: string;
  descricao: string;
  dataCadastro: Date;
  telefone: string;
  status: string;
  empresa: string;
}
