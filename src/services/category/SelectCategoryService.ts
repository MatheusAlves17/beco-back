import prismaClient from '../../prisma/index';
class SelectCategoryService {
    async execute(user_id: string, category_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role === 'admin') {
            console.log(isAdmin.role);
            

            const category = await prismaClient.prismaClient.category.findFirst({
                where:{
                    id: category_id
                },
                select: {
                    id: true,
                    name: true,
                    product: true
                }
            });
            return category;
        };
    };
};

export { SelectCategoryService };