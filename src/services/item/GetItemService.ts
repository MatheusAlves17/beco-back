import prismaClient from '../../prisma';

class GetItemService {
    async execute(order_id: string) {
        const items = await prismaClient.prismaClient.item.findMany({
            where: {
                order_id
            },
            select: {
                id: true,
                name: true,
                banner: true,
                price: true,
                order_id: true,
                status: true,
                product_id: true
            }
        });

        return items;
    };
};

export { GetItemService };