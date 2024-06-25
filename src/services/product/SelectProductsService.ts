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
                active: true,
                path: true,
            },
            where:{
                active: true
            },orderBy:{
                created_at: 'asc'
            }
            
        });
        return products;
    };
};

export { SelectProductsService };