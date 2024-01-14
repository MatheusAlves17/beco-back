import prismaClient from '../../prisma';
import { IUpdateUser } from '../../interfaces';

class UpdateUserService {
    async execute({ user_id, name, phone, picture }: IUpdateUser) {
        if (!user_id) {
            throw new Error('Usuário inválido!');
        };

        if (!name) {
            throw new Error('Nome obrigatório');
        };

        if (!phone) {
            throw new Error('Telefone obrigatório');
        };

        const update = await prismaClient.prismaClient.user.update({
            where: {
                id: user_id
            },
            data:{
                name,
                phone,
                picture
            },
            select:{
                name: true,
                phone: true,
                picture: true
            }
        })

        return update;

    }
};

export { UpdateUserService };