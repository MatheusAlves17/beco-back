import prismaClient from '../../prisma';

interface ICreateItem {
    order_id: string;
    product_id: string;
    status_id: string;
    value_total: number;
};

class CreateItemService {
    async execute(items : ICreateItem[]) {
        const item = await prismaClient.prismaClient.item.createMany({
            data: items,
        });

        return item;

    };
};

export { CreateItemService };