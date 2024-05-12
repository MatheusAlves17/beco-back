import prismaClient from '../../prisma';

interface ICancelOrder {
    order_id: string;
};

class CancelOrderService {
    async execute({ order_id }: ICancelOrder) {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Cancelado'
            }
        });

        const statusId = status.id;

        const order = await prismaClient.prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status_id: statusId
            }
        })

        return {msg: 'Ordem cancelada'}
    }
};

export { CancelOrderService };