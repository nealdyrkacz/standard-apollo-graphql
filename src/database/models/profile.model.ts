import { Model, DataTypes, Sequelize } from 'sequelize';

export class Profile extends Model {
  public id!: string;
  public firstName: string;
  public lastName: string;
  public identityId: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initProfile(sequelize: Sequelize): void {
  Profile.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      lastName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      identityId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      tableName: 'profile',
    },
  );
}
