import { IUpdateCard } from '../../interfaces';
import prismaClient from '../../prisma';


class UpdateCardService {
    async execute({id, number, cvv, validity, name, flag }: IUpdateCard) {
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

        const card = await prismaClient.prismaClient.card.update({
            where: {
                id
            },
            data: {
                number,
                cvv,
                validity,
                name,
                flag
            }
        });
        return card;
    };
};

export { UpdateCardService };