import prismaClient from '../../prisma';

class AuthorizeExchangeService {
    async execute(items: string[], status_id: string) {
        // const status = await prismaClient.prismaClient.status.findFirst({
        //     where: {
        //         id: status_id
        //     },
        //     select: {
        //         id: true
        //     }
        // })

        // const statusId = status.id;

        const itemsToExchange = await prismaClient.prismaClient.item.updateMany({
            where: {
                id: {
                    in: items
                }
            },
            data: {
                status_id: status_id
            }
        })

        return itemsToExchange;
    }
};

export { AuthorizeExchangeService };