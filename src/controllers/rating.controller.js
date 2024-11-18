import { responseSuccess } from "../common/helpers/handle.response.js";
import { ratingService } from "../services/rating.service.js";

export const ratingController = {
    create: async function (req, res, next) {
        try {
            const result = await ratingService.create(req);
            const response = responseSuccess(
                result,
                `Create rating successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findRatingByRestaurantId: async function (req, res, next) {
        try {
            const result = await ratingService.findRatingByRestaurantId(req);
            const response = responseSuccess(
                result,
                `Get all rating successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findRatingByUserId: async function (req, res, next) {
        try {
            const result = await ratingService.findRatingByUserId(req);
            const response = responseSuccess(
                result,
                `Get rating #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    update: async function (req, res, next) {
        try {
            const result = await ratingService.update(req);
            const response = responseSuccess(
                result,
                `Update rating #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    remove: async function (req, res, next) {
        try {
            const result = await ratingService.remove(req);
            const response = responseSuccess(
                result,
                `Remove rating #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
