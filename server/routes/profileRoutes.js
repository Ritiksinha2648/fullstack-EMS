

import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getProfile, Updateprofile } from "../controllers/profileController.js";


const profileRouter = Router();


profileRouter.get("/", protect, getProfile)
profileRouter.post("/", protect, Updateprofile)

export default profileRouter;