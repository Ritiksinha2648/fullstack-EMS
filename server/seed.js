
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt'


const TemporyPassword = "admin123";

async function registerAdmin() {


    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        if (!ADMIN_EMAIL) {
            console.error('Missing ADMIN_EMAIL env variable')
            process.exit(1);

        }
        await connectDB()
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingAdmin) {
            console.log("User already exxists as role!", existingAdmin.role);
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash(TemporyPassword, 10)
        const admin = await User.create({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN",
        })
        console.log("Admin User Created");
        console.log("/n email:", admin.email);
        console.log("password:", TemporyPassword);
        console.log("/n change the password after login.");
        process.exit(0);



    } catch (error) {

        console.error("seed failed: ", error);

    }

}
registerAdmin();
