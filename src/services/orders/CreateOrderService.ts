import prismaClient from '../../prisma';

interface ICreateOrderService {
    delivery: number;
    value_total: number;
    status_id: string;
    user_id: string;
    address_id?: string;
};

class CreateOrderService {
    async execute({
        delivery,
        value_total,
        status_id,
        user_id,
        address_id
    }: ICreateOrderService) {
        // if (!delivery) {
        //     throw new Error('Frete obrigatório');
        // };

        // if (!value_total) {
        //     throw new Error('Valor do carrinho obrigatório');
        // };

        // if (!user_id) {
        //     throw new Error('Usuário não autenticado');
        // };


        const order = await prismaClient.prismaClient.order.create({
            data: {
                delivery,
                value_total,
                status_id,
                user_id,
                address_id
            },
            select: {
                id: true,
                delivery: true,
                value_total: true,
                status_id: true,
                user_id: true,
                // address_id: true
            }
        });

        return order;
    };
};

export { CreateOrderService };