import { hash } from 'bcryptjs';
import { IUpdatePassword } from '../../interfaces/user/Update';
import PrismaClient from '../../prisma';

class UpdatePasswordService {
    async execute({ user_id, currentPassword, newPassword, confirmNewPassword }: IUpdatePassword) {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            throw new Error('Preencha todas as informações');
        }

        const passwordHash = await hash(newPassword, 8);


        if (newPassword !== confirmNewPassword) {
            throw new Error('As senhas não conferem');
        }

        if (currentPassword === newPassword && currentPassword === confirmNewPassword) {
            throw new Error('Nova senha não pode ser a mesma que a senha anterior');
        }

        const update = await PrismaClient.prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                password: passwordHash
            }

        });
        return update;
    };
};

export { UpdatePasswordService };