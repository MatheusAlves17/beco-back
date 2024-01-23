import prismaClient from '../../prisma';

class SelectOrderService {
    async execute(order_id: string) {
        const order = await prismaClient.prismaClient.order.findFirst({
            where: {
                id: order_id
            },
            select: {
                id: true,
                shipping: true,
                value_total: true,
                created_at: true,
                status: true,
                item: true,
                address: true,
            }
        });

        return order;
    };
};

export { SelectOrderService };