import { CreateCoupon } from '../../interfaces';
import prismaClient from '../../prisma';



class CreateCouponService {
    async execute(order_id: string) {
        
        const order = await prismaClient.prismaClient.order.findFirst({
            where:{
                id: order_id
            }
        });
        
        const coupon = await prismaClient.prismaClient.coupon.create({
            data:{
                value: order.value_total,
                user_id: order.user_id
            },
            select:{
                id: true,
                value: true,
                user_id: true,
            }
        })

        return coupon;
    };
};

export { CreateCouponService };