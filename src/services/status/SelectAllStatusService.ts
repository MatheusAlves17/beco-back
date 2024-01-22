import prismaClient from '../../prisma';

class SelectAllStatusService {
    async execute(user_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada');
        };
        
        const status = await prismaClient.prismaClient.status.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return status;
    }
};

export { SelectAllStatusService };