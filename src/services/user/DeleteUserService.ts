import prismaClient from '../../prisma';

class DeleteUserService {
    async execute(user_id: string) {

        const user = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if(!user){
            throw new Error('Usuário não encontrado');
        }

        const userDelete = await prismaClient.prismaClient.user.delete({
            where: {
                id: user_id
            }
        });

        return userDelete;
    }
};

export { DeleteUserService };