import prismaClient from '../../prisma';

class SelectValidCouponsService {
    async execute(user_id: string) {
        const coupons = await prismaClient.prismaClient.coupon.findMany({
            where: {
                user_id,
                isUsed: false
            }
        });

        if (coupons.length < 1) {
            return 'Não há cupons disponíveis nesse momento'}

        else {
            return coupons
        };
    };
};

export { SelectValidCouponsService };