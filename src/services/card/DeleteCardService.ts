import { IDeleteCard } from '../../interfaces';
import prismaClient from '../../prisma';

class DeleteCardService {
    async execute({ card_id, user_id }: IDeleteCard) {
        const card = await prismaClient.prismaClient.card.findFirst({
            where: {
                id: card_id
            }
        });

        if (!card) {
            throw new Error('Cartão inválido');
        };
        if (user_id === card.user_id) {
            const deleteCard = await prismaClient.prismaClient.card.delete({
                where: {
                    id: card_id
                }
            });
            return 'Cartão excluído com sucesso';
        }
    }
};

export { DeleteCardService };