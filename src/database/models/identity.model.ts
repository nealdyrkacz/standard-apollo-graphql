import { Model, DataTypes, Sequelize, Association, HasOneGetAssociationMixin } from 'sequelize';
import { Profile } from './profile.model';

export class Identity extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public profile!: HasOneGetAssociationMixin<Profile>; // Note the null assertions!

  public static associations: {
    profile: Association<Identity, Profile>;
  };
}

export interface IdentityView {
  id: string;
  username: string;
  password: string;
}

export function initIdentity(sequelize: Sequelize): void {
  Identity.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      tableName: 'identity',
    },
  );
}

export function associateIdentity(): void {
  Identity.hasOne(Profile, {
    sourceKey: 'id',
    foreignKey: 'identityId',
    as: 'profile', // this determines the name in `associations`!
  });
}
