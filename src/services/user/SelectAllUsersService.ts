import prismaClient from '../../prisma';
class SelectAllUsersService {
    async execute(isAdmin: string) {
        if(isAdmin !== 'admin@master.com'){
            throw new Error('Operação não autorizada');
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