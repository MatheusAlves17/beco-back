import prismaClient from '../../prisma';

class GetOrdersCancelService {
    async execute() {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                AND: [
                    { name: "Cancelado" },
                    { name: "Itens devolvidos" }
                ]
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