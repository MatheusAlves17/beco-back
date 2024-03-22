import primasClient from '../../prisma';

class DetailsUserService {
    async execute(user_id: string) {

        const user = await primasClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select:{
                name: true,
                cpf: true,
                phone: true,
                email: true,
                // picture: true,
            }
        });
        return user;
    };
};

export { DetailsUserService };