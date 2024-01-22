import prismaClient from '../../prisma';

interface IUpdateStatus {
    status_id: string;
    name: string;
};

class UpdateStatusService {

    async execute(user_id: string, { status_id, name }: IUpdateStatus) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada');
        };

        const statusAlreadyExists = await prismaClient.prismaClient.status.findFirst({
            where: {
                name
            }
        });

        if (statusAlreadyExists) {
            throw new Error('Status já cadastrado');
        };

        if (!name) {
            throw new Error('Nome do status é obrigatório');
        };

        const status = await prismaClient.prismaClient.status.update({
            where: {
                id: status_id
            },
            data: {
                name
            },
            select: {
                id: true,
                name: true
            }
        });

        return status;
    }
};

export { UpdateStatusService };