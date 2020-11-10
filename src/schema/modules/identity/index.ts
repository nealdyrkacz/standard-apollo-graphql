// The GraphQL schema in string form
import { gql } from 'apollo-server';
import { Identity } from '../../../database/models/identity.model';
import { db } from '../../../database/models/';
import IdentityDAO from '../../../dao/identityDAO';

export const typeDefs = gql`
  extend type Query {
    identity(id: ID!): Identity
    identityWithProfile(id: ID!): Identity
    identities: [Identity]
  }

  type Identity {
    id: ID!
    username: String!
    profile: Profile
  }
`;

export const resolvers = {
  Query: {
    async identity(root: never, { id }: unknown): Promise<Identity> {
      return await IdentityDAO.getIdentityById(id);
    },
    async identityWithProfile(root: never, { id }: unknown): Promise<Identity> {
      return await IdentityDAO.getIdentityWithProfileById(id);
    },
    async identities(): Promise<Identity[]> {
      return await db.Identity.findAll({});
    },
  },
};
