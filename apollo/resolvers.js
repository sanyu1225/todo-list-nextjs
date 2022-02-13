const Todo = require('./models')

export const resolvers = {
  Query: {
    // 查詢所有資料
    getTodos: async () => {
      try {
        const datas = await Todo.find({})
        return datas
      } catch (err) {
        console.log(err)
      }
    },
  },

  Mutation: {
    newTodos: async (_, { input }) => {
      try {
        const todoList = new Todo(input)
        const result = await todoList.save()
        return result
      } catch (err) {
        console.log(err)
      }
    },
    updateTodo: async (_, { id, input }) => {
      let todoList = await Todo.findById(id)
      if (!todoList) {
        throw new Error(`id:${id} not found'`)
      }
      todoList = await Todo.findOneAndUpdate({ _id: id }, input, {
        new: true,
      })
      return todoList
    },
    deleteTodo: async (_, { id }) => {
      const todoList = await Todo.findById(id)
      if (!todoList) {
        throw new Error(`id:${id} not found`)
      }
      await Todo.findOneAndDelete({ _id: id })
      return 'todo removed'
    },
  },
}