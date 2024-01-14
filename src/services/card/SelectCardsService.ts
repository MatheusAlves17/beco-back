import prismaCliente from '../../prisma';
interface ISelectCards {
    user_id: string;
}

class SelectCardsService {
    async execute({ user_id }: ISelectCards) {
        const cards = await prismaCliente.prismaClient.card.findMany({
            where: {
                user_id
            }
        });
        return cards;
    }
};

export { SelectCardsService };