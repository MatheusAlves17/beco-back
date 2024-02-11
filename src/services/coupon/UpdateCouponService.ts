import { UpdateCoupon } from '../../interfaces/coupon/UpdateCoupon';
import prismaClient from '../../prisma';

class UpdateCouponService {
    async execute({ id, user_id }: UpdateCoupon) {

        const userCoupon = await prismaClient.prismaClient.coupon.findFirst({
            where: {
                id,
            }
        });

        console.log('user_id:', user_id, ' - ', userCoupon.user_id);



        if (userCoupon.user_id == user_id) {
            if (!userCoupon.isUsed) {
                const coupon = await prismaClient.prismaClient.coupon.update({
                    where: {
                        id
                    },
                    data: {
                        isUsed: !userCoupon.isUsed
                    }
                });
                return coupon;
            } else {
                throw new Error('Cupom já foi usado');
            }
        } else {
            throw new Error('Cupom inválido');
        };
    };
};

export { UpdateCouponService };