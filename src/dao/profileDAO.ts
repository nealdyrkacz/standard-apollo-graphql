import { db } from '../database/models';
import { Profile } from '../database/models/profile.model';

class ProfileDAO {
  static async getProfileById(id: string): Promise<Profile> {
    try {
      return await db.Profile.findByPk(id);
    } catch (e) {
      console.log(e);
    }
  }

  static async getProfiles(): Promise<Profile[]> {
    try {
      return await db.Profile.findAll({});
    } catch (e) {
      console.log(e);
    }
  }
}

export default ProfileDAO;
