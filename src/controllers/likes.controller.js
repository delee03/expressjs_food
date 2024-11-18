import { responseSuccess } from "../common/helpers/handle.response.js";
import { likeService } from "../services/likes.service.js";

export const likeController = {
    create: async function (req, res, next) {
        try {
            const result = await likeService.create(req);
            const response = responseSuccess(
                result,
                `Create like restaurants successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findAllRestaurantLiked: async function (req, res, next) {
        try {
            const result = await likeService.findAll(req);
            const response = responseSuccess(
                result,
                `Get all likes successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    findRestaurantLikeById: async function (req, res, next) {
        try {
            const result = await likeService.findListLikeByRestaurant(req);
            const response = responseSuccess(
                result,
                `Get likes #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    findOne: async function (req, res, next) {
        try {
            const result = await likeService.findOne(req);
            const response = responseSuccess(
                result,
                `Get likes #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    update: async function (req, res, next) {
        try {
            const result = await likeService.update(req);
            const response = responseSuccess(
                result,
                `Update likes #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    remove: async function (req, res, next) {
        try {
            const result = await likeService.remove(req);
            const response = responseSuccess(
                result,
                `Remove likes #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
