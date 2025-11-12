import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { TUser, TUserCreationAttributes } from './user.interface';

class User extends Model<TUser, TUserCreationAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updateTimestamp',
  },
);

export default User;
