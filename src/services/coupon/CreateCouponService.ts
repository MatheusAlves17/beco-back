import { CreateCoupon } from '../../interfaces';
import prismaClient from '../../prisma';



class CreateCouponService {
    async execute({ user_id, value, client_id }: CreateCoupon) {
        
        if(!user_id){
            throw new Error('Usuário obrigatório');
        }
        
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        });

        if(isAdmin.role !== 'admin'){
            throw new Error('Operação não autorizada');
        }

        if(!client_id){
            throw new Error('Usuário obrigatório');
        }
        
        if(!value){
            throw new Error('Valor obrigatório');
        }

        if(value < 10){
            throw new Error('Valor não pode ser menor que R$ 10');
        }

        const coupon = await prismaClient.prismaClient.coupon.create({
            data:{
                value,
                user_id: client_id
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