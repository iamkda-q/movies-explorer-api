const mongoose = require('mongoose');

const { NODE_ENV, DB_ADDRESS } = process.env;

module.exports = async () => {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://localhost:27017/moviesdb');
    console.log('moviesdb is connected');
  } catch (err) {
    console.log(err.message);
  }
};
