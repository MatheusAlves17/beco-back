import prismaClient from '../../prisma';

class GetItemsExchangeService {
    async execute() {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: "Em troca"
            },
            select: {
                id: true
            }
        })

        const statusId = status.id;

        const itemsToExchange = await prismaClient.prismaClient.item.findMany({
            where: {
                status_id: statusId
            },
            select: {
                id: true,
                name: true,
                price: true,
                banner: true,
                order_id: true,
            }
        });

        return itemsToExchange;
    }
};

export { GetItemsExchangeService };