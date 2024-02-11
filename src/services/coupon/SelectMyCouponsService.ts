import prismaClient from '../../prisma';

class SelectMyCouponsService {
    async execute(user_id: string) {
        const coupons = await prismaClient.prismaClient.coupon.findMany({
            where: {
                user_id
            }
        });

        if (!coupons) {
            return 'Não há cupons disponíveis nesse momento'
        }
        else {
            return coupons
        };
    };
};

export { SelectMyCouponsService };