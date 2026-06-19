import express from "express"
import cors from "cors"
import "dotenv/config"
import multer from "multer";
import connectDB from "./config/db.js";
import dns from "node:dns"
import employeeRouter from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipRoutes.js";
import dashbordRouter from "./routes/dashboardRoutes.js";


import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"




dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express()
const PORT = process.env.PORT || 4000;


// Middle ware


app.use(cors())
app.use(express.json())
app.use(multer().none())



//  Routes----

app.get("/", (req, res) => res.send("Server Is Runnning"))

app.use("/api/auth", authRouter)
app.use("/api/employees", employeeRouter)
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/payslips", payslipRouter)
app.use("/api/dashboard", dashbordRouter)


app.use("/api/inngest", serve({ client: inngest, functions }));






await connectDB();

app.listen(PORT, () => console.log(`server Running On Port ${PORT}`))  