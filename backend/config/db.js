const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = connectDB;
