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

        if (!flag) {
            throw new Error('Bandeira é obrigatória');
        }

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