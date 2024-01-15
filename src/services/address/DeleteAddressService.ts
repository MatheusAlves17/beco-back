import prismaClient from '../../prisma';

class DeleteAddressService {
    async execute(address_id: string) {
        const address = await prismaClient.prismaClient.address.findFirst({
            where: {
                id: address_id
            }
        });

        if (!address) {
            throw new Error('Endereço inválido');
        };

        const addressDelete = await prismaClient.prismaClient.address.delete({
            where: {
                id: address_id
            }
        });

        return 'Endereço excluído com sucesso';
    }
};

export { DeleteAddressService };