import prismaClient from '../../prisma';

class GetOrdersCancelService {
    async execute() {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: "Cancelado"
            },
        });

        const orders = await prismaClient.prismaClient.order.findMany({
            where: {
                status_id: status.id
            }
        });

        return orders;
    };
};

export { GetOrdersCancelService };