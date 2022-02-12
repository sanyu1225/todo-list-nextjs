import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    text: String!
    status: Int!
  }

  type Query {
    viewer: [User]
  }

`
