import { db } from '../database/models';
import { Identity } from '../database/models/identity.model';
import { Profile } from '../database/models/profile.model';

interface IdentityView {
  id: string;
  username: string;
  password: string;
}

class IdentityDAO {
  static async getIdentityById(id: string): Promise<Identity> {
    try {
      return await db.Identity.findByPk(id);
    } catch (e) {
      console.log(e);
    }
  }

  static async getIdentityWithProfileById(id: string): Promise<Identity> {
    try {
      return await db.Identity.findOne({
        where: {
          id: id,
        },
        include: { model: Profile, as: 'profile' },
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getIdentities(): Promise<Identity[]> {
    try {
      return await db.Identity.findAll({});
    } catch (e) {
      console.log(e);
    }
  }
}

export default IdentityDAO;
