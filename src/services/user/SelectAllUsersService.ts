import prismaClient from '../../prisma';
class SelectAllUsersService {
    async execute(user_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            },
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não permitida');
        };

        const users = await prismaClient.prismaClient.user.findMany({
            where:{
                role: 'client'
            },
            select: {
                id: true,
                cpf: true,
                name: true,
                phone: true,
                birth: true,
                email: true,
                active: true,
                address: true,
            }
        });

        return users;
    };
};

export { SelectAllUsersService };