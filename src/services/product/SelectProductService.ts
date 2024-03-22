import prismaClient from '../../prisma';

class SelectProductService {
    async execute(product_id: string) {
        const product = await prismaClient.prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                stock: true,
                description: true,
                category: true,
                banner: true,
            }
        });

        if (!product) {
            throw new Error('Produto não encontrado');
        };

        return product;
    }
};

export { SelectProductService };