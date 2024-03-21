import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { ILogin } from "../../interfaces";

class AuthUserService {
    async execute({ email, password }: ILogin) {
        if (!email) {
            throw new Error('E-mail é obrigatório');
        }

        if (!password) {
            throw new Error('Senha é obrigatória');
        }

        const user = await prismaClient.prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error('E-mail e/ou senha inválido(s)');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('E-mail e/ou senha inválido(s)');
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '15d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            phone: user.phone,
            // picture: user.picture,
            role: user.role,
            token,
        };

    }
}

export { AuthUserService };