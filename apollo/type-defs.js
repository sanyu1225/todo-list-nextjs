import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Todos {
    id: ID!
    text: String!
    status: Int!
  }

  type Query {
    getTodos: [Todos]
  }

  input TodosInput {
    text: String
    status: Int!
  }

  type Mutation {
    #Todos
    newTodos(input: TodosInput): Todos
    updateTodo(id: ID!, input: TodosInput): Todos
    deleteTodo(id: ID!): String
  }
`



