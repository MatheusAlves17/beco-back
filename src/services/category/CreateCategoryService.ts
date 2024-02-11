import prismaClient from '../../prisma';
interface ICategory {
    name: string;
    user_id: string;
}
class CreateCategoryService {
    async execute({ name, user_id }: ICategory) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role === 'admin') {
            console.log(isAdmin.role);
            
            if (!name) {
                throw new Error('Nome de categoria é obrigatório');
            }

            const category = await prismaClient.prismaClient.category.create({
                data: {
                    name
                },
                select: {
                    id: true,
                    name: true,
                }
            });
 
            return category;
        } else {
            throw new Error('Operação não autorizada!');
        }

    };

};

export { CreateCategoryService };