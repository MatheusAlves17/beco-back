import prismaClient from '../../prisma';

class GetItemService {
    async execute(order_id: string) {
        const items = await prismaClient.prismaClient.item.findMany({
            where: {
                order_id
            },
            select: {
                id: true,
                name: true,
                banner: true,
                price: true,
                order_id: true,
                status: true,
                product_id: true
            }
        });

        const itemMap = new Map<string, any>();

        items.forEach(item => {
            if(itemMap.has(item.product_id)){
                const itemExists = itemMap.get(item.product_id);
                itemExists.quantity += 1;
            }else{
                itemMap.set(item.product_id, {...item, quantity: 1});
            }
        });



        

        return Array.from(itemMap.values());
    };
};

export { GetItemService };