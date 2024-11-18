import prisma from "../common/prisma/prisma.init.js";

export const orderService = {
    create: async function (req) {
        let { user_id, food_id } = req.body;
        if (!user_id || !food_id) {
            throw new Error("Missing required fields");
        }
        const newOrder = await prisma.orders.create({
            data: {
                user_id: +user_id,
                food_id: +food_id,
            },
        });
        return newOrder;
    },

    findAll: async function (req) {
        let { pageIndex, pageSize } = req.query;
        pageIndex = pageIndex ? +pageIndex : 1;
        pageSize = pageSize ? +pageSize : 10;
        const totalItems = await prisma.orders.count();
        const totalPages = Math.ceil(totalItems / pageSize);
        const orders = await prisma.orders.findMany({
            skip: (pageIndex - 1) * pageSize,
            take: pageSize,
        });

        return {
            orders,
            pageIndex,
            pageSize,
            totalPages,
            totalItems,
        };
    },

    findOne: async function (req) {
        return `This action returns a entity with id: ${req.params.id}`;
    },

    update: async function (req) {
        return `This action updates a entity with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a entity with id: ${req.params.id}`;
    },
};
