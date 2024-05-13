import prismaClient from '../../prisma';

class GetOrdersCancelService {
    async execute(status_id: string) {

        // const status = await prismaClient.prismaClient.status.findFirst({
        //     where: {
        //         name: "Cancelado"
        //     },
        // });

        const orders = await prismaClient.prismaClient.order.findMany({
            where: {
                status_id: status_id
            }
        });

        return orders;
    };
};

export { GetOrdersCancelService };