import prismaClient from '../../prisma';

class DeleteStatusService {
    async execute(user_id: string, status_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada');
        };

        const statusExists = await prismaClient.prismaClient.status.findFirst({
            where: {
                id: status_id
            }
        });

        if (!statusExists) {
            throw new Error('Produto inválido');
        };

        const status = await prismaClient.prismaClient.status.delete({
            where: {
                id: status_id
            }
        });

        return 'Status excluído com sucesso'

    };
};

export { DeleteStatusService };