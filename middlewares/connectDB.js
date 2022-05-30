const mongoose = require('mongoose');
const { dbAddr } = require('../utils/constants');

const { NODE_ENV, DB_ADDRESS } = process.env;

module.exports = async () => {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : dbAddr);
    console.log('moviesdb is connected', NODE_ENV);
  } catch (err) {
    console.log(err.message);
  }
};
