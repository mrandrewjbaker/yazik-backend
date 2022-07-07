import { Router } from "express";
import authRouter from "./auth-router";

// Init
const apiRouter = Router();

// Add api routes
apiRouter.use("/auth", authRouter);

// Export default
export default apiRouter;
