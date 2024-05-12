import prismaClient from '../../prisma';

class ReceiptItemsService {
    async execute(items: string[]) {
        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Troca encerrada'
            },
            select: {
                id: true
            }
        });

        const statusId = status.id;

        let products;
        const productCounts: { [productId: string]: number } = {};

        for (let item of items) {
            const itemData = await prismaClient.prismaClient.item.findUnique({
                where: {
                    id: item
                }
            });

            if (itemData) {
                const productId = itemData.product_id;

                if (productCounts[productId]) {
                    productCounts[productId]++;
                } else {
                    productCounts[productId] = 1;
                }
            };
        };
        for (const productId in productCounts) {
            const count = productCounts[productId];

            await prismaClient.prismaClient.product.update({
                where: {
                    id: productId
                },
                data: {
                    stock: {
                        increment: count
                    }
                }
            });
        }
        return productCounts;
    };
};

export { ReceiptItemsService };