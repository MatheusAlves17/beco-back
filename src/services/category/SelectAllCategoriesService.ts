import prismaClient from '../../prisma/index';
class SelectAllCategoriesService {
    async execute(user_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role === 'admin') {

            const categories = await prismaClient.prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                    product: true
                }
            });
            return categories;
        };
    };
};

export { SelectAllCategoriesService };