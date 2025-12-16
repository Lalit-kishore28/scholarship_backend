require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('Testing MongoDB URI:', uri);

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Mongoose connected successfully');
    process.exit(0);
  } catch (err) {
    console.error('Mongoose connection error:', err.message);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  }
})();
