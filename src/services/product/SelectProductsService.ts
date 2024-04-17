import prismaClient from '../../prisma';

class SelectProductsService {
    async execute() {
        const products = await prismaClient.prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                stock: true,
                // category: true,
                banner: true,
                active: true
            },
            where:{
                active: true
            }
            
        });
        return products;
    };
};

export { SelectProductsService };