import prismaClient from '../../prisma';

class SelectAddressService {
    async execute(address_id: string) {
        const address = await prismaClient.prismaClient.address.findFirst({
            where: {
                id: address_id
            },
            select: {
                street: true,
                number: true,
                district: true,
                city: true,
                state: true,
                zipCode: true,
                user_id: true
            },
        });

        return address;
    }
};

export { SelectAddressService };