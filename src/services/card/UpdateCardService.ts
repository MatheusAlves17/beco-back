import { IUpdateCard } from '../../interfaces';
import prismaClient from '../../prisma';


class UpdateCardService {
    async execute({id, number, cvv, validity, name, flag, principal }: IUpdateCard) {
        if(!number){
            throw new Error('Número de cartão obrigatório');
        }

        if(!cvv){
            throw new Error('CVV obrigatório');
        }

        if(!validity){
            throw new Error('Data de válidade obrigatória');
        }

        if(!name){
            throw new Error('Nome obrigatório');
        }

        if (principal) {

            const cards = await prismaClient.prismaClient.card.findFirst({
                where: {
                    principal: true
                }
            });

            if (cards) {
                const cardsUpdate = await prismaClient.prismaClient.card.update({
                    where: {
                        id: cards.id
                    },
                    data: {
                        principal: false
                    }
                })
            }
        }

        const card = await prismaClient.prismaClient.card.update({
            where: {
                id
            },
            data: {
                number,
                cvv,
                validity,
                name,
                flag,
                principal
            }
        });
        return card;
    };
};

export { UpdateCardService };