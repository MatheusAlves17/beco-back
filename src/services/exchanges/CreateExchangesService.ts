import prismaClient from '../../prisma';

interface CreateExchange {
    user_id?: string;
    itemsId: string[];
}

interface Items {
    id: string;
}

class CreateExchangesService {
    async execute({ itemsId, user_id }: CreateExchange) {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Em troca'
            },
            select: {
                id: true
            }
        });

        for (const itemId of itemsId) {
             await prismaClient.prismaClient.item.update({
                where: {
                    id: itemId
                },
                data: {
                    status_id: { set: status.id }
                }
            })
        }
    };
};

export { CreateExchangesService };