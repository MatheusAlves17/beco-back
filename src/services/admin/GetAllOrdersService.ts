import prismaClient from '../../prisma/index';
class GetAllOrdersService {
    async execute(status_id: string) {
        const orders = await prismaClient.prismaClient.order.findMany({
            where:{
                status_id: status_id
            }
        });

        return orders;
    }
};

export { GetAllOrdersService };