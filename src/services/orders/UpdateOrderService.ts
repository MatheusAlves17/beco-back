import prismaClient from '../../prisma';

interface IUpdateOrder {
    user_id: string;
    status_id: string;
    order_id: string;
}

class UpdateOrderService {
    async execute({ user_id, status_id, order_id }: IUpdateOrder) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada');
        };

        const order = await prismaClient.prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status_id
            },
            select: {
                id: true,
                shipping: true,
                value_total: true,
                status_id: true,
                user_id: true,
                address_id: true,
                status: true,
            }
        });
        return order;
    };
};

export { UpdateOrderService };