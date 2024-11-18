import { BadRequestError } from "../common/helpers/handle.error.js";
import prisma from "../common/prisma/prisma.init.js";

export const ratingService = {
    create: async function (req) {
        const { user_id, res_id, amount } = req.body;
        if (!user_id || !res_id || !amount) {
            throw new BadRequestError(
                "Please provide user_id, res_id and amount"
            );
        }
        const newRating = await prisma.rate_res.create({
            data: {
                user_id: +user_id,
                res_id: +res_id,
                amount: +amount,
            },
        });
        return newRating;
    },

    findRatingByRestaurantId: async function (req) {
        const id = req.params.id;
        let { pageIndex, pageSize } = req.query;
        console.log(id);
        if (!id) {
            throw new BadRequestError("Please provide res_id");
        }
        pageIndex = +pageIndex || 1;
        pageSize = +pageSize || 3;

        const amount = await prisma.rate_res
            .count({
                where: {
                    res_id: +id,
                },
            })
            .then((total) => {
                // console.log(total);
                return {
                    total,
                    totalPage: Math.ceil(total / pageSize),
                };
            });

        const rating = await prisma.rate_res.findMany({
            where: {
                res_id: +id,
            },
            skip: (pageIndex - 1) * pageSize,
            take: pageSize,
        });
        return {
            rating,
            pageIndex,
            pageSize,
            totalItems: amount.total,
            totalPage: amount.totalPage,
        };
    },

    findRatingByUserId: async function (req) {
        const id = req.params.id;
        let { pageIndex, pageSize } = req.query;
        pageIndex = +pageIndex || 1;
        pageSize = +pageSize || 3;
        let skip = (pageIndex - 1) * pageSize;
        const totalItems = await prisma.rate_res.count({
            where: {
                user_id: +id,
            },
        });

        const rating = await prisma.rate_res.findMany({
            where: {
                user_id: +id,
            },
            skip: skip,
            take: pageSize,
        });
        return {
            rating,
            pageIndex,
            pageSize,
            totalItems,
            totalPage: Math.ceil(totalItems / pageSize),
        };
    },

    update: async function (req) {
        return `This action updates a rating with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a rating with id: ${req.params.id}`;
    },
};
