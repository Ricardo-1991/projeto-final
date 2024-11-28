import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export interface UsuarioModel
  extends Model<
    InferAttributes<UsuarioModel>,
    InferCreationAttributes<UsuarioModel>
  > {
  id: CreationOptional<string>;
  nome: string;
  email: string;
  senha: string;
}
