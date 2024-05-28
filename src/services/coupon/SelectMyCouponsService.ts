import prismaClient from '../../prisma';

class SelectMyCouponsService {
    async execute(user_id: string) {
        const coupons = await prismaClient.prismaClient.coupon.findMany({
            where: {
                AND: [
                    { user_id: user_id },
                    { isUsed: false }
                ]
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