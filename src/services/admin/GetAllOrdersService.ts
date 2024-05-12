import prismaClient from '../../prisma/index';
class GetAllOrdersService {
    async execute() {
        const orders = await prismaClient.prismaClient.order.findMany();

        return orders;
    }
};

export { GetAllOrdersService };