import prismaClient from '../../prisma';

class AuthorizeExchangeService {
    async execute(items: string[]) {
        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: "Troca autorizada"
            },
            select: {
                id: true
            }
        })

        const statusId = status.id;

        const itemsToExchange = await prismaClient.prismaClient.item.updateMany({
            where: {
                id: {
                    in: items
                }
            },
            data: {
                status_id: statusId
            }
        })

        return itemsToExchange;
    }
};

export { AuthorizeExchangeService };