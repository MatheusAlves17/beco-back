import prismaClient from '../../prisma';

export interface IUpdateActive {
    user_id: string;
    active: boolean;
}

class UpdateActivityUserService {
    async execute(isAdmin: string, { user_id, active }: IUpdateActive) {

        if (isAdmin !== 'admin@master.com') {
            throw new Error('Operação não autorizada');
        };

        const user = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            },
        });

        const userUpdate = await prismaClient.prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                active: active
            }
        });

        return 'Usuário atualizado com sucesso!';



    }
};

export { UpdateActivityUserService };