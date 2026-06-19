


import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getDashboard } from "../controllers/dashboardController.js";

const dashbordRouter = Router();


dashbordRouter.get("/", protect, getDashboard)



export default dashbordRouter;