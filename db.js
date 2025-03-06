const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Define a simple schema
        const TestSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model("TestCollection", TestSchema);

        // Insert a sample document
        await TestModel.create({ name: "Hello, MongoDB!" });
        console.log("📌 Sample document inserted!");
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
