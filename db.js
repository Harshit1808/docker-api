const mongoose = require('mongoose');

// Connect to MongoDB
const DB = 'mongodb://mongo_db:27017/';
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
      await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  };

module.exports =connectDB;
