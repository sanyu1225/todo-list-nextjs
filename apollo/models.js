import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Number,
    required: true,
    trim: true,
  },
})

TodoSchema.index({ name: 'text' })

module.exports =
  mongoose.models.Todos || mongoose.model('Todos', TodoSchema)
