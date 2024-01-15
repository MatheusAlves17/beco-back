import  prismaClient  from '../../prisma/index';
import { hash } from 'bcryptjs';

import { IUser } from "../../interfaces";



class CreateUserService {
    async execute({ name, cpf, phone, email, password, role, picture }: IUser) {
        if(!name){
            throw new Error('Nome é obrigatório');
        }

        if(!cpf){
            throw new Error('CPF é obrigatório');
        }

        if(!phone){
            throw new Error('Celular é obrigatório');
        }

        if(!email){
            throw new Error('E-mail é obrigatório');
        }

        if(!password){
            throw new Error('Senha é obrigatória');
        }

        const cpfAlreadyExists = await prismaClient.prismaClient.user.findFirst({
            where:{
                cpf: cpf
            }
        });

        const emailAlreadyExists = await prismaClient.prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(cpfAlreadyExists){
            throw new Error('CPF já cadastrado');
        };

        if(emailAlreadyExists){
            throw new Error('E-mail já cadastrado');
        };

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.prismaClient.user.create({
            data:{
                name,
                cpf,
                phone,
                email,
                password: passwordHash,
                role,
                picture
            },
            select:{
                id: true,
                name: true,
                cpf: true,
                phone: true,
                email: true,
                picture: true
            }
        });

        return user;
    };
};

export { CreateUserService };