import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export interface UsuarioModel
  extends Model<
    InferAttributes<UsuarioModel>,
    InferCreationAttributes<UsuarioModel>
  > {
  id: CreationOptional<string>;
  name: string;
  email: string;
  password: string;
}
