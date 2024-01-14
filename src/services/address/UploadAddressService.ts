import prismaClient from '../../prisma';

import { IUploadAddress } from "../../interfaces";

class UploadAddressService {

    async execute({ id, street, number, zipCode, district, city, state }: IUploadAddress) {
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

        const address = await prismaClient.prismaClient.address.update({
            where: {
                id: id
            },
            data: {
                street,
                number,
                zipCode,
                district,
                city,
                state
            },
            select: {
                street: true,
                number: true,
                zipCode: true,
                district: true,
                city: true,
                state: true
            },
        })

    }

};

export { UploadAddressService };