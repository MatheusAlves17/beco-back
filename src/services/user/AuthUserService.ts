import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

import { ILogin } from "../../interfaces";

class AuthUserService {
    async execute({ email, password }: ILogin) {
        if(!email){
            throw new Error('E-mail é obrigatório');
        }

        if(!password){
            throw new Error('Senha é obrigatória');
        }

        const user = await prismaClient.prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if(!user){
            throw new Error('E-mail e/ou senha inválido(s)');
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error('E-mail e/ou senha inválido(s)');
        }

        return {ok: true};

    }
}

export { AuthUserService };