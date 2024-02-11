import { Request, Response } from "express";
import { CreateUserService } from '../../services';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, cpf, phone, email, password, role } = req.body;

        if (!req.file) {
            throw new Error("Falha ao enviar foto do produto")
        } else {
            const { filename } = req.file;
            
            const createUserService = new CreateUserService();
            const user = await createUserService.execute({
                name,
                cpf,
                phone,
                email,
                password,
                role,
                picture: filename,
            });

            return res.json(user);
        };
    };
};

export { CreateUserController };