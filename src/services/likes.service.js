import prisma from "../common/prisma/prisma.init.js";

export const likeService = {
    create: async function (req) {
        let { res_id, user_id } = req.body;
        // Kiểm tra dữ liệu đầu vào
        if (!user_id || !res_id) {
            return res
                .status(400)
                .json({ message: "user_id and res_id are required" });
        }
        let result = await prisma.likes.create({
            data: {
                res_id: +res_id,
                user_id: +user_id,
            },
        });
        return result;
    },

    findAll: async function (req) {
        let { pageIndex, pageSize } = req.query;
        pageSize = pageSize ? +pageSize : 3;
        pageIndex = pageIndex ? +pageIndex : 1;
        const offset = (pageIndex - 1) * pageSize;
        let totalItems = await prisma.restaurants.count();
        let totalPages = Math.ceil(totalItems / pageSize);
        const results = await prisma.restaurants.findMany({
            skip: offset,
            take: pageSize,
        });

        return {
            pageIndex,
            pageSize,
            totalItems,
            totalPages,
            results: results || [],
        };
    },

    findListLikeByRestaurant: async function (req) {
        let { id } = req.params; //giả sử đây là id của restaurant
        let { pageIndex, pageSize } = req.query;
        pageSize = pageSize ? +pageSize : 3;
        pageIndex = pageIndex ? +pageIndex : 1;
        let skip = (pageIndex - 1) * pageSize;
        let totalItems = await prisma.likes.count({
            where: {
                restaurants: {
                    res_id: +id,
                },
            },
        });
        let totalPages = Math.ceil(totalItems / pageSize);
        let results = await prisma.likes.findMany({
            where: {
                restaurants: {
                    res_id: +id,
                },
            },
            skip,
            take: pageSize,
            include: {
                users: true,
                restaurants: true,
            },
        });
        return {
            pageIndex,
            pageSize,
            totalItems,
            totalPages,
            results: results || [],
        };
    },

    update: async function (req) {
        return `This action updates a likes with id: ${req.params.id}`;
    },

    remove: async function (req) {
        let { user_id, res_id } = req.body;
        // Kiểm tra dữ liệu đầu vào
        if (!user_id || !res_id) {
            return res
                .status(400)
                .json({ message: "user_id and res_id are required" });
        }
        // Chuyển đổi date_likes thành định dạng Date hợp lệ

        const deletedItem = await prisma.likes.delete({
            where: {
                user_id_res_id: {
                    user_id: parseInt(user_id),
                    res_id: parseInt(res_id),
                },
            },
        });

        return { notify: "OK deleted", deletedItem };
    },
};
