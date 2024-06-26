import prismaClient from '../../prisma/index';
class GetAllOrdersService {
    async execute(status_id: string) {
        const orders = await prismaClient.prismaClient.order.findMany({
            where: {
                status_id: status_id,
            },
            select: {
                id: true,
                item: true,
                status: true,
                value_total: true,
                user: { select: { name: true, id: true, email: true } },
                created_at: true,
            },
            orderBy:{
                created_at: 'desc'
            }
        });

        return orders;
    }
};

export { GetAllOrdersService };