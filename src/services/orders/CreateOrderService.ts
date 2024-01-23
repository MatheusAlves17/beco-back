import prismaClient from '../../prisma';

interface ICreateOrderService {
    shipping: number;
    value_total: number;
    status_id: string;
    user_id: string;
    address_id: string;
};

class CreateOrderService {
    async execute({
        shipping,
        value_total,
        status_id,
        user_id,
        address_id
    }: ICreateOrderService) {
        if (!shipping) {
            throw new Error('Frete obrigatório');
        };

        if (!value_total) {
            throw new Error('Valor do carrinho obrigatório');
        };

        if (!user_id) {
            throw new Error('Usuário não autenticado');
        };

        if (!address_id) {
            throw new Error('Endereço é obrigatório');
        };

        const order = await prismaClient.prismaClient.order.create({
            data: {
                shipping,
                value_total,
                status_id,
                user_id,
                address_id
            },
            select: {
                id: true,
                shipping: true,
                value_total: true,
                status_id: true,
                user_id: true,
                address_id: true
            }
        });

        return order;
    };
};

export { CreateOrderService };