import prismaClient from '../../prisma';

class SelectStatusService {
    async execute(user_id: string, status_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada');
        };
        
        const status = await prismaClient.prismaClient.status.findFirst({
            where:{
                id: status_id
            },
            select: {
                id: true,
                name: true
            }
        });

        if (!status) {
            throw new Error('Status não encontrado');
        };

        return status;
    }
};

export { SelectStatusService };