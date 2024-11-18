import { Router } from "express";
import likesRouter from "./likes.router.js";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    res.json("Hello World");
});

rootRouter.use("/likes", likesRouter);

export default rootRouter;
