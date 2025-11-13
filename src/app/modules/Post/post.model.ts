import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { IPost, IPostCreationAttributes } from './post.interface';
import User from '../User/user.model';

class Post extends Model<IPost, IPostCreationAttributes> implements IPost {
  declare id: string;
  declare title?: string;
  declare shortDescription?: string;
  declare content: string;
  declare userId: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  // Business logic
  public isOwnedBy(userId: string): boolean {
    return this.userId === userId;
  }

  public toSafeObject(): { [K in keyof IPost]?: IPost[K] | undefined } {
    return {
      id: this.id,
      title: this.title,
      shortDescription: this.shortDescription,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static async createPost(data: IPostCreationAttributes): Promise<Post> {
    return await Post.create(data);
  }

  public static async findByUserId(userId: string): Promise<Post[]> {
    return await Post.findAll({ where: { userId } });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'post',
    timestamps: true,
  },
);

// association
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author',
});

User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
});

export default Post;
