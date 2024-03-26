import prismaClient from '../../prisma';
import { IAddress } from '../../interfaces';


class CreateAddressService {
    async execute({ street, number, district, city, state, zipCode, user_id , type}: IAddress) {

        if (!user_id) {
            throw new Error('Usuário inválido');
        };

        if (!street) {
            throw new Error('Rua obrigatória');
        };

        if (!number) {
            throw new Error('Número obrigatório');
        };

        if (!district) {
            throw new Error('Bairro obrigatório');
        };

        if (!city) {
            throw new Error('Cidade obrigatória');
        };

        if (!state) {
            throw new Error('Estado obrigatório');
        };

        if (!zipCode) {
            throw new Error('CEP obrigatório');
        };

        if (!type) {
            throw new Error('Tipo obrigatório');
        };

        const address = await prismaClient.prismaClient.address.create({
            data: {
                street,
                number,
                district,
                city,
                state,
                zipCode,
                user_id,
                type
            },
            select: {
                street: true,
                number: true,
                district: true,
                city: true,
                state: true,
                zipCode: true,
                user_id: true,
                type: true
            },
        });

        return address;

    };


};

export { CreateAddressService };