import prismaClient from '../../prisma';

class GetOrdersCancelService {
    async execute(status_id: string) {
        const orders = await prismaClient.prismaClient.order.findMany({
            where: {
                status_id: status_id
            },
            select:{
                status: true
            }
        });

        return orders;
    };
};

export { GetOrdersCancelService };