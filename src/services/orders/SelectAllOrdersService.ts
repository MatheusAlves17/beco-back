import prismaClient from '../../prisma';

class SelectAllOrdersService {
    async execute(user_id: string) {
        const orders = await prismaClient.prismaClient.order.findMany({
            where: {
                user_id
            },
            select: {
                id: true,
                delivery: true,
                value_total: true,
                created_at: true,
                status: true,
                item: true,
                address: true,
            }
        });
        return orders;
    };
};

export { SelectAllOrdersService };