import prismaClient from '../../prisma';

class SendItemsService {
    async execute(order_id: string, items: string[]) {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Itens devolvidos'
            }
        });

        const order = await prismaClient.prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        });

        if (order) {

            const updateOrder = await prismaClient.prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    status_id: status.id
                }
            });

            for (let item of items) {
                await prismaClient.prismaClient.item.update({
                    where: {
                        id: item
                    },
                    data: {
                        status_id: status.id
                    }
                });
            };

            return { msg: 'Itens devolvidos' }

        };

    };
};

export { SendItemsService };