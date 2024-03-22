import prismaClient from '../../prisma';
import { IUpdateUser } from '../../interfaces';

class UpdateUserService {
    async execute({ user_id, name, phone, email, cpf }: IUpdateUser) {
        if (!user_id) {
            throw new Error('Usuário inválido!');
        };

        if (!name) {
            throw new Error('Nome obrigatório');
        };

        if (!phone) {
            throw new Error('Telefone obrigatório');
        };

        if (!email) {
            throw new Error('E-mail obrigatório');
        };

        if (!cpf) {
            throw new Error('CPF obrigatório');
        };

        const update = await prismaClient.prismaClient.user.update({
            where: {
                id: user_id
            },
            data:{
                name,
                phone,
                email,
                cpf,
            },
            select:{
                name: true,
                phone: true,
                email:true,
                cpf:true,
            }
        })

        return update;

    }
};

export { UpdateUserService };