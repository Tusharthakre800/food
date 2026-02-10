const mongoose = require('mongoose');
const UserModel = require('./src/models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const connectDB = require('./src/db/db');

const seedAdmin = async () => {
    try {
        await connectDB();
        console.log("Connected to DB");

        const adminEmail = process.env.Admin_Email;
        const adminPassword = process.env.Admin_Password;

        // Check if user exists
        const existingUser = await UserModel.findOne({ email: adminEmail });
        
        if (existingUser) {
            console.log("User found. Updating to Admin role...");
            existingUser.role = "admin";
            // Re-hash password to be sure (optional, but good if they forgot)
            existingUser.password = await bcrypt.hash(adminPassword, 10);
            await existingUser.save();
            console.log("User updated to Admin successfully!");
        } else {
            console.log("User not found. Creating new Admin...");
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await UserModel.create({
                fullname: "Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin"
            });
            console.log("Admin created successfully!");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();