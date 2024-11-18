import express from "express";
import { ratingController } from "../controllers/rating.controller.js";

const ratingRouter = express.Router();

ratingRouter.post("/", ratingController.create);
ratingRouter.get("/getByResId/:id", ratingController.findRatingByRestaurantId);
ratingRouter.get("/getByUserId/:id", ratingController.findRatingByUserId);
ratingRouter.patch("/:id", ratingController.update);
ratingRouter.delete("/:id", ratingController.remove);

export default ratingRouter;
