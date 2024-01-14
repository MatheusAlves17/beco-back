import prismaCliente from '../../prisma';


class SelectCardService {
    async execute(card_id: string) {
        const card = await prismaCliente.prismaClient.card.findFirst({
            where: {
                id: card_id
            }
        });

        if (!card) {
            throw new Error('Cartão não foi encontrado');
        };

        return card;
    };
};

export { SelectCardService };