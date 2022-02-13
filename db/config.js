const mongoose = require('mongoose')

const MongoDb = "mongodb+srv://jimmy:V-2p99mLpwvWWm2@cluster0.chdhh.mongodb.net/todo?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log('db success connect')
  } catch (err) {
    console.log('error connecting to database')
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDb
