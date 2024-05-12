import prismaClient from '../../prisma';
interface IUpdateStatus {
    status_id: string;
    order_id: string;
};

class UpdateOrderStatusService {
    async execute({ order_id, status_id }: IUpdateStatus) {

        if (!order_id) {
            throw new Error('Ordem de compra inválida!');
        }
        if (!status_id) {
            throw new Error('Status obrigatório!');
        }

        const updatedOrder = await prismaClient.prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: { connect: { id: status_id } }

            }
        });

        const updatedItems = await prismaClient.prismaClient.item.updateMany({
            where: {
                order_id: order_id
            },
            data: {
                status_id: { set: status_id }
            }
        })

        if (updatedOrder && updatedItems) {
            return { msg: 'Status atualizado com sucesso!' }
        }
    };
};

export { UpdateOrderStatusService };