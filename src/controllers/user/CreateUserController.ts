import { Request, Response } from "express";
import { CreateUserService } from '../../services';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, cpf, phone, email, password, role, picture } = req.body;
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

export { CreateUserController };