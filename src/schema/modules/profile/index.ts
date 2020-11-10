// The GraphQL schema in string form
import { gql } from 'apollo-server';
import { Profile } from '../../../database/models/profile.model';
import { db } from '../../../database/models/';
import ProfileDAO from '../../../dao/profileDAO';

export const typeDefs = gql`
  extend type Query {
    profile(id: ID!): Profile
    profiles: [Profile]
  }

  type Profile {
    id: ID!
    firstName: String!
    lastName: String!
    identityId: ID!
  }
`;

export const resolvers = {
  Query: {
    async profile(root: never, { id }: unknown): Promise<Profile> {
      return await ProfileDAO.getProfileById(id);
    },
    async profiles(): Promise<Profile[]> {
      try {
        return await db.Profile.findAll({});
      } catch (e) {
        console.log(e);
      }
    },
  },
};
