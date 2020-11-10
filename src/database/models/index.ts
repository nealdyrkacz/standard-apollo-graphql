import { Sequelize } from 'sequelize';
import { initIdentity, Identity, associateIdentity } from './identity.model';
import { initProfile, Profile } from './profile.model';

const sequelize = new Sequelize(
  <string>process.env.DB,
  <string>process.env.DB_USERNAME,
  <string>process.env.DB_PASSWORD,
  {
    host: <string>process.env.DB_HOST,
    dialect: 'postgres',
  },
);

initIdentity(sequelize);
initProfile(sequelize);

associateIdentity();

export const db = {
  sequelize,
  Sequelize,
  Identity: Identity,
  Profile: Profile,
};
