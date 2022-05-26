const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_ADDRESS);
    console.log('moviesdb is connected');
  } catch (err) {
    console.log(err.message);
  }
};
