require('dotenv').config();
const mongoose = require('mongoose');
const Scholarship = require('./models/Scholarship');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const count = await Scholarship.countDocuments();
    const first = await Scholarship.findOne().lean();
    console.log('Count:', count);
    console.log('First doc:', first);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
