import { Router } from "express";
import likesRouter from "./likes.router.js";
import ratingRouter from "./rating.router.js";
import orderRouter from "./order.router.js";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    res.json("Hello World");
});

rootRouter.use("/likes", likesRouter);
rootRouter.use("/rating", ratingRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
