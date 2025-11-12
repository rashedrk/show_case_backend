import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { IUser, IUserCreationAttributes } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare address: string;
  declare gender: 'male' | 'female';
  declare password: string;
  declare role: 'user';
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }

  public toSafeObject(): Omit<IUser, 'password'> {
    return this.toJSON() as Omit<IUser, 'password'>;
  }

  public static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(config.salt_rounds));
  }

  public static async findUserById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
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
    tableName: 'user',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },
  },
);

// Password hashing before creation
User.beforeCreate(async (user: User) => {
  if (user.password) {
    user.password = await User.hashPassword(user.password);
  }
});

export default User;
