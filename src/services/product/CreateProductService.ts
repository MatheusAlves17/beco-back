import prismaClient from '../../prisma';

interface ICreateProduct {
    name: string;
    price: number;
    description: string;
    banner: string;
    category_id: string;
    stock: number;
    weight: number;
};

class CreateProductService {
    async execute(user_id, { name, price, description, banner, category_id, stock, weight }: ICreateProduct) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        console.log(isAdmin.role);
        

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada!');
        };

        if (!name) {
            throw new Error('Nome obrigatório');
        };

        if (!price) {
            throw new Error('Preço obrigatório');
        };

        if (!description) {
            throw new Error('Descrição obrigatória');
        };

        if (!banner) {
            throw new Error('Foto obrigatória');
        };

        if (!category_id) {
            throw new Error('Categoria obrigatória');
        };

        if (!stock) {
            throw new Error('Quantidade obrigatória');
        };

        const product = await prismaClient.prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id,
                stock,
                weight
            }
        });

        return product;
    };
};

export { CreateProductService };