import prismaClient from '../../prisma';

import { ICard } from "../../interfaces";

class CreateCardService {
    async execute(user_id, { number, validity, cvv, name, flag, principal }: ICard) {

        if (!user_id) {
            throw new Error('Usuário inválido');
        }

        if (!number) {
            throw new Error('Número de cartão obrigatório');
        }

        if (!cvv) {
            throw new Error('CVV obrigatório');
        }

        if (!validity) {
            throw new Error('Data de válidade obrigatória');
        }

        if (!name) {
            throw new Error('Nome obrigatório');
        }

        if (!name) {
            throw new Error('Bandeira é obrigatória');
        }

        // if (principal) {

        //     const cards = await prismaClient.prismaClient.card.findFirst({
        //         where: {
        //             id: user_id,
        //             principal: true
        //         }
        //     });

        //     if (cards) {
        //         const cardsUpdate = await prismaClient.prismaClient.card.update({
        //             where: {
        //                 id: cards.id
        //             },
        //             data: {
        //                 principal: false
        //             }
        //         })
        //     }

        const card = await prismaClient.prismaClient.card.create({
            data: {
                number,
                validity,
                name,
                cvv,
                user_id,
                flag,
                principal: true
            }
        });
        return card;
        // }
    }
};

export { CreateCardService };