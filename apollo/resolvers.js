export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return [
        { id: 1, status: 0, text: 'Learn React' },
        { id: 2, status: 1, text: 'buy flowers' },
      ]
    },
  },
}
