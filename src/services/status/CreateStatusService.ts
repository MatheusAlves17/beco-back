import prismaClient from '../../prisma';

interface ICreateStatus {
    name: string;
}

class CreateStatusService {
    async execute(user_id: string, { name }: ICreateStatus) {
        // const isAdmin = await prismaClient.prismaClient.user.findFirst({
        //     where: {
        //         id: user_id
        //     }
        // });

        // if (isAdmin.role !== 'admin') {
        //     throw new Error('Operação não autorizada');
        // };

        const statusAlreadyExists = await prismaClient.prismaClient.status.findFirst({
            where:{
                name
            }
        });

        if(statusAlreadyExists) {
            throw new Error('Status já cadastrado');
        };

        if (!name) {
            throw new Error('Nome do status é obrigatório');
        };

        const status = await prismaClient.prismaClient.status.create({
            data: {
                name
            },
            select: {
                id: true,
                name: true
            }
        });

        return status;

    };
};

export { CreateStatusService };