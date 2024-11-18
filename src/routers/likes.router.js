import { Router } from "express";
import { likeController } from "../controllers/likes.controller.js";

const likesRouter = Router();

likesRouter.get("/", likeController.findAllRestaurantLiked);

likesRouter.get(
    "/get-likes-by-restaurant/:id",
    likeController.findRestaurantLikeById
);

likesRouter.post("/", likeController.create);

likesRouter.delete("/", likeController.remove);

export default likesRouter;
