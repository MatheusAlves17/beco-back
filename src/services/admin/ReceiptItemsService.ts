import prismaClient from '../../prisma';

class ReceiptItemsService {
    async execute(items: string[], order_id?: string) {
        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Troca encerrada'
            },
            select: {
                id: true
            }
        });

        const statusId = status.id;

        const productCounts: { [productId: string]: number } = {};
        const userSums: { [userId: string]: number } = {};


        for (let item of items) {
            const itemData = await prismaClient.prismaClient.item.findUnique({
                where: {
                    id: item
                },
                include: {
                    user: true
                }
            });

            if (itemData) {
                const productId = itemData.product_id;
                const userId = itemData.user_id;
                const itemPrice = itemData.price;

                if (userSums[userId]) {
                    userSums[userId] += itemPrice.toNumber();
                } else {
                    userSums[userId] = itemPrice.toNumber();
                }

                if (productCounts[productId]) {
                    productCounts[productId]++;
                } else {
                    productCounts[productId] = 1;
                }
            };

            const updatedItems = await prismaClient.prismaClient.item.update({
                where: {
                    id: item
                },
                data: {
                    status_id: statusId
                }
            });

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
        let sum;
        for (const userId in userSums) {
            sum = userSums[userId];

            await prismaClient.prismaClient.coupon.create({

                data: {
                    value: sum,
                    user_id: userId
                }
            });
        }

        const order = await prismaClient.prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status_id: status.id
            }
        });

        return { msg: 'Estoque atualizado e cupom gerado!' }

    };
};

export { ReceiptItemsService };