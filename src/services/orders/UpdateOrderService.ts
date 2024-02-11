import prismaClient from '../../prisma';

interface IUpdateOrder {
    status_id: string;
    order_id: string;
}

class UpdateOrderService {
    async execute({  status_id, order_id }: IUpdateOrder) {
        const order = await prismaClient.prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status_id
            },
            select: {
                id: true,
                delivery: true,
                value_total: true,
                status_id: true,
                address_id: true,
                status: true,
            }
        });
        return order;
    };
};

export { UpdateOrderService };