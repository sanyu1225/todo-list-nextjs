import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'


import connectDb from '../../db/config'

connectDb()

const apolloServer = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
