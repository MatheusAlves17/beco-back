import prismaClient from '../../prisma';
class SelectAllAddressService {
    async execute(user_id: string) {
        const address = await prismaClient.prismaClient.address.findMany({
            where: {
                user_id: user_id
            }
        })

        return address;
    }
};

export { SelectAllAddressService };